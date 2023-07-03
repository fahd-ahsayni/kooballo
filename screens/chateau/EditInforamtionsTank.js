import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  FormControl,
  Input,
  VStack,
  Select,
  CheckIcon,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase_customer } from "../../supabase/supabase-customer";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { t } from "../../i18n";

export default function UpdateTankScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { tankID } = route.params;

  const fetchChateauData = useSelector((state) => state.chateau.entities);

  const fetchTankData = fetchChateauData.filter(
    (item) => item.id === tankID
  )[0];

  const [name, setName] = useState(fetchTankData ? fetchTankData.name : "");
  const [street, setStreet] = useState(
    fetchTankData ? fetchTankData.street : ""
  );
  const [quarter, setQuarter] = useState(
    fetchTankData ? fetchTankData.quarter : ""
  );
  const [house, setHouse] = useState(fetchTankData ? fetchTankData.house : "");
  const [litres, setLitres] = useState(
    fetchTankData ? fetchTankData.litres : ""
  );
  const [city, setCity] = useState(fetchTankData ? fetchTankData.city : "");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputWithError, setInputWithError] = useState("");

  const fetchCitiesFromDB = useCallback(async () => {
    const { data } = await supabase_customer.from("cities").select("*");
    setCities(data);
  }, []);

  useEffect(() => {
    fetchCitiesFromDB();
  }, [fetchCitiesFromDB]);

  useEffect(() => {
    setInputWithError("");
  }, [tankID]);

  const success = t("UpdateChateau.success");

  const handleUpdateTank = useCallback(async () => {
    setLoading(true);

    const updateData = {
      name: name,
      street: street,
      quarter: quarter,
      house: house,
      litres: litres,
      city: city,
    };

    const { data, error: updateError } = await supabase_customer
      .from("chateau")
      .update(updateData)
      .eq("id", tankID);

    setLoading(false);
    setTimeout(() => {
      navigation.navigate("success", { text: success });
    }, 100);
  }, [name, street, quarter, house, litres, city, tankID, success]);

  return (
    <SafeAreaView className="justify-center flex-1 px-4 pt-12 bg-white">
      <View className="h-16 relative w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0"
          style={{
            width: 52,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
        >
          <Icon name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="mt-6">
          <View className="px-2">
            <Text
              style={{ fontFamily: "poppins-semibold" }}
              className="text-2xl"
            >
              {t("CreateChateau.Title")}
            </Text>
          </View>
          <Center className="py-8">
            <VStack space={4} width="94%">
              <FormControl isRequired isInvalid={inputWithError == "name"}>
                <FormControl.Label>
                  {t("CreateChateau.ChateauNameLabel")}
                </FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Home Chateau or work chateau ..."
                  keyboardType="default"
                  style={{ fontFamily: "poppins-regular" }}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </FormControl>

              <VStack space={4}>
                <FormControl.Label className="-mb-4">
                  {t("CreateChateau.CityLabel")}
                </FormControl.Label>
                <Select
                  w="100%"
                  className="py-3"
                  selectedValue={city}
                  accessibilityLabel="Choose City"
                  placeholder="Laayoune or Smara ..."
                  style={{ fontFamily: "poppins-regular" }}
                  _selectedItem={{
                    bg: "#0ea5e9",
                    endIcon: <CheckIcon color="#fff" size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setCity(itemValue)}
                >
                  {cities.map(({ id, name }) => (
                    <Select.Item key={id} label={name} value={name} />
                  ))}
                </Select>
              </VStack>

              <FormControl>
                <FormControl.Label>
                  {t("CreateChateau.StreetLabel")}
                </FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Iben Roshed ..."
                  keyboardType="default"
                  value={street}
                  style={{ fontFamily: "poppins-regular" }}
                  onChangeText={(text) => setStreet(text)}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputWithError == "quarter"}>
                <FormControl.Label>
                  {t("CreateChateau.Quarter")}
                </FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your quarter"
                  keyboardType="default"
                  style={{ fontFamily: "poppins-regular" }}
                  value={quarter}
                  onChangeText={(value) => setQuarter(value)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  {t("CreateChateau.House")}
                </FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="n° 120 or 50 ..."
                  keyboardType="number-pad"
                  style={{ fontFamily: "poppins-regular" }}
                  value={house.toString()}
                  onChangeText={(value) => setHouse(value)}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputWithError == "litres"}>
                <FormControl.Label>
                  {t("CreateChateau.Litres")}
                </FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="1000 or 1500 ..."
                  style={{ fontFamily: "poppins-regular" }}
                  value={litres.toString()}
                  onChangeText={(value) => setLitres(value)}
                />
              </FormControl>

              <View className="w-full justify-center items-center mt-8">
                <TouchableOpacity
                  onPress={handleUpdateTank}
                  className="w-full"
                  style={{
                    backgroundColor: Colors.primary,
                    height: 64,
                    borderRadius: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flexDirection: "row",
                    padding: 12,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#fff",
                      paddingHorizontal: 16,
                      fontFamily: "poppins-semibold",
                    }}
                  >
                    {loading
                      ? t("CreateChateau.PleaseWait")
                      : t("UpdateChateau.UpdateButton")}
                  </Text>

                  <View
                    style={{
                      backgroundColor: "#fff",
                      width: 40,
                      aspectRatio: 1,
                      borderRadius: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="checkmark-done"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </VStack>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
