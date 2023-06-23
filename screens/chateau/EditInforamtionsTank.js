import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Alert,
  Image,
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
  Spinner,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase_customer } from "../../supabase/supabase-customer";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function EditInforamtionsTank() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [quarter, setQuarter] = useState("");
  const [house, setHouse] = useState("");
  const [litres, setLitres] = useState(0);
  const [photo, setPhoto] = useState("");
  const [cities, setCities] = useState([]);


  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const chateauData = useSelector((state) => state.chateau.entities);
  const chateauFiltred = chateauData.filter((chateau) => chateau.id == id);

  useEffect(() => {
    if (chateauData && chateauData.length > 0) {
      setName(chateauFiltred[0].name);
      setCity(chateauFiltred[0].city);
      setStreet(chateauFiltred[0].street);
      setQuarter(chateauFiltred[0].quarter);
      setHouse(chateauFiltred[0].house.toString());
      setLitres(chateauFiltred[0].litres.toString());
      setPhoto(chateauFiltred[0].chateau_profile);
    }
  }, [chateauData]);

  const fetchCitiesFromDB = useCallback(async () => {
    try {
      const { data, error } = await supabase_customer
        .from("cities")
        .select("*");

      if (error) {
        throw error;
      }

      setCities(data);
    } catch (error) {
      console.error("Error fetching cities: ", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCitiesFromDB();
  }, [fetchCitiesFromDB]);

  const handleUpdateChateau = async () => {
    try {
      const updateData = {
        name,
        street,
        quarter,
        house,
        litres,
        city,
      };

      const { data, error: updateError } = await supabase_customer
        .from("chateau")
        .update(updateData)
        .eq("id", chateauFiltred[0].id);

      if (updateError) {
        showError("An error occurred while updating your chateau", "");
      }

      if (data) {
        setFetchError(null);
        setInputWithError("");
      }
    } catch (err) {
      console.error("Error: ", err.message);
      Alert.alert("Error", err.message);
    } finally {
      navigation.navigate("success", { text: "Chateau add successfully" });
    }
  };

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
              Please complete all fields to add your Chateau information.
            </Text>
          </View>
          <Center className="py-8">
            <VStack space={4} width="94%">
              <FormControl>
                <FormControl.Label>Chateau name</FormControl.Label>
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
                <FormControl.Label className="-mb-4">City</FormControl.Label>
                <Select
                  w="100%"
                  className="py-3"
                  selectedValue={city}
                  accessibilityLabel="Choose City"
                  placeholder="Choose City"
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
                <FormControl.Label>Street</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your street"
                  keyboardType="default"
                  value={street}
                  style={{ fontFamily: "poppins-regular" }}
                  onChangeText={(text) => setStreet(text)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Quarter</FormControl.Label>
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
                <FormControl.Label>House N°</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your house n°"
                  keyboardType="number-pad"
                  style={{ fontFamily: "poppins-regular" }}
                  value={house}
                  onChangeText={(value) => setHouse(value)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Litres</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter the number of litres"
                  keyboardType="number-pad"
                  style={{ fontFamily: "poppins-regular" }}
                  value={litres}
                  onChangeText={(value) => setLitres(value)}
                />
              </FormControl>

              <View className="w-full justify-center items-center mt-8">
                <TouchableOpacity
                  onPress={handleUpdateChateau}
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
                    Update Your Chateau
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
