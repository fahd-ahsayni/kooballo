import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Center,
  VStack,
  Select,
  CheckIcon,
  Text,
  Modal,
  Box,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../constants/Colors";
import { fetchChateau } from "../redux/chateauSlice";
import { calculatePrice, generateOrderKey } from "../functions";
import { supabase_customer } from "../supabase/supabase-customer";

const INVALID_CHATEAU_ID_MESSAGE = "Please choose a chateau";
const CREATE_ORDER_TEXT = "Create Your Order";
const PLEASE_WAIT_TEXT = "Please Wait ...";

export default function CreateNewOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [chateauId, setChateauId] = useState("");
  const [filterData, setFilterData] = useState({});

  const profileData = useSelector((state) => state.profiles);
  const chateauData = useSelector((state) => state.chateau.entities);

  useEffect(() => {
    if (profileData?.id) {
      dispatch(fetchChateau(profileData?.id));
    }
  }, [dispatch, profileData?.id]);

  const handleChateauIdChange = (newChateauId) => {
    const filteredChateau = chateauData.find(
      (chateau) => chateau.id === newChateauId
    );
    if (!filteredChateau) return;
    setChateauId(newChateauId);
    setFilterData(filteredChateau);
  };

  const handleOrder = async () => {
    if (!chateauId) {
      alert("Please select a chateau first");
      return;
    }

    setLoading(true);

    try {
      const { data } = await supabase_customer
        .from("profiles")
        .select("solde")
        .eq("id", profileData.id)
        .single();

      const currentSolde = data.solde;
      const orderPrice = calculatePrice(filterData.litres);

      if (orderPrice > currentSolde) {
        alert("Insufficient solde. Please recharge your solde.");
        setLoading(false);
        return;
      } else {
        await supabase_customer
          .from("profiles")
          .update({ solde: currentSolde - orderPrice })
          .eq("id", profileData.id);

        const insertData = {
          chateau_id: chateauId,
          costumer_id: profileData.id,
          chateau_name: filterData?.name,
          chateau_litres: filterData?.litres,
          chateau_city: filterData?.city,
          chateau_street: filterData?.street,
          chateau_house: filterData?.house,
          chateau_quarter: filterData?.quarter,
          chateau_latitude: filterData?.latitude,
          chateau_longitude: filterData?.longitude,
          order_key: generateOrderKey(6),
          price: orderPrice,
          avatar_url: filterData?.chateau_profile,
        };

        await supabase_customer.from("orders").insert([insertData]);

        navigation.navigate("success", { text: "Order Created Successfuly" });
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const behavior = Platform.select({
    ios: "padding",
    android: "height",
  });

  return (
    <SafeAreaView className="justify-center pt-12 flex-1 bg-white">
      <View className="h-20 relative w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4"
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
      <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }}>
        <View className="mb-8 px-6">
          <Text className="text-2xl" style={{ fontFamily: "poppins-semibold" }}>
            Just choose your chateau to complete the order.
          </Text>
        </View>
        <Center>
          <VStack space={4} width="92%">
            <Center>
              <Box w="100%">
                <Select
                  isDisabled={!chateauData}
                  selectedValue={chateauId}
                  w="100%"
                  style={{ fontFamily: "poppins-semibold" }}
                  accessibilityLabel="Choose Chateau"
                  placeholder={
                    chateauData
                      ? "Choose a chateau"
                      : "please create chateau first"
                  }
                  _selectedItem={{
                    bg: "#0ea5e9",
                    endIcon: <CheckIcon color="#fff" size="5" />,
                  }}
                  mt={1}
                  className="py-3"
                  onValueChange={(itemValue) =>
                    handleChateauIdChange(itemValue)
                  }
                >
                  {chateauData?.map((chateau) => (
                    <Select.Item
                      label={chateau.name}
                      value={chateau.id}
                      key={chateau.id}
                    />
                  ))}
                </Select>
              </Box>
            </Center>

            <View className="w-full justify-center items-center mt-8 px-4">
              <TouchableOpacity
                onPress={handleOrder}
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
                  {loading ? PLEASE_WAIT_TEXT : CREATE_ORDER_TEXT}
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

            <Text
              fontSize="md"
              bold
              color="#0ea5e9"
              textAlign="center"
              onPress={() => navigation.navigate("AddNewChateau")}
            >
              Click To Create New Chateau ?
            </Text>
          </VStack>
        </Center>
      </KeyboardAvoidingView>
      <Modal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            Votre solde est insuffisant pour passer cette commande.
          </Modal.Body>

          <Modal.Footer>
            <View className="flex-1">
              <Button
                className="mt-2.5 bg-sky-500"
                _text={{
                  fontWeight: 600,
                }}
                onPress={() => navigation.navigate("Solde")}
              >
                Recharge your solde
              </Button>
              <Button
                className="mt-2.5 bg-gray-100"
                _text={{
                  color: "gray.600",
                  fontWeight: 600,
                }}
                onPress={() => setModalVisible(false)}
              >
                Close
              </Button>
            </View>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
}
