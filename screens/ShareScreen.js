import React, { useState, useEffect } from "react";
import { Image, SafeAreaView, TouchableOpacity, View } from "react-native";
import { Share } from "react-native";
import KooballoLogo from "../assets/images/kooballo.png";
import { VStack, Text, Center } from "native-base";
import { supabase_customer } from "../supabase/supabase-customer";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ShareScreen() {
  const navigation = useNavigation();
  const [messageData, setMessageData] = useState([]);

  const fetchMessage = () => {
    supabase_customer
      .from("message")
      .select("*")
      .eq("id", 666)
      .single()
      .then(({ data, error }) => {
        if (error) throw error;
        setMessageData(data);
      })
      .catch((error) => {
        console.log("Error fetching messages:", error);
        setMessageData(null);
      });
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  const onShare = () => {
    Share.share({
      message: messageData ? messageData?.message : "",
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(`Shared with activity type of ${result.activityType}`);
          } else {
            console.log("Shared!");
          }
        } else if (result.action === Share.dismissedAction) {
          console.log("Dismissed");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-center">
      <Center flex={1} bg="white" px="6">
        <VStack space={5} alignItems="center" rounded="lg" overflow="hidden">
          <Image source={KooballoLogo} resizeMode="cover" className="h-52 w-52" />
          <VStack space={2}>
            <Text
              style={{ fontFamily: "poppins-semibold", color: Colors.text }}
              className="text-lg"
            >
              The First Water Delivery App in Laayoune
            </Text>
            <Text
              style={{ fontFamily: "poppins-regular", color: Colors.darkText }}
            >
              Experience the convenience of Kooballo, the first water delivery
              app in the city of Laayoune. With Ma3andek Maatsallo, you no
              longer have to worry about running out of water or going through
              the hassle of purchasing and carrying heavy water bottles.
            </Text>

            <View className="justify-center mt-8">
              <TouchableOpacity
                onPress={onShare}
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
                  Let's Share Kooballo
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
                  <Icon name="share-social" size={24} color={Colors.primary} />
                </View>
              </TouchableOpacity>
            </View>
          </VStack>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}
