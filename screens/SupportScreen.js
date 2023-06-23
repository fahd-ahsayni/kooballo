import { View, Text, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import Colors from "../constants/Colors";

import Clock from "../assets/icons/clock.png";
import { useNavigation } from "@react-navigation/native";

export default function SupportScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 w-full pt-16 bg-white px-6 justify-start items-center">
      <View className="h-20 relative w-full">
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

      <Text
        style={{
          fontFamily: "poppins-semibold",
        }}
        className="mb-8 text-slate-600 text-center text-xl"
      >
        For any information or reclamation please contact the Kooballo customer
        relations center at.
      </Text>
      <Image source={Clock} resizeMode="cover" className="h-20 w-20" />
      <View className="border mt-8 rounded border-sky-600 py-2.5 w-full">
        <Text
          style={{
            fontFamily: "poppins-semibold",
          }}
          className="font-semibold text-xl text-center mb-2.5"
        >
          Monday - saturday
        </Text>
        <Text
          style={{
            fontFamily: "poppins-bold",
          }}
          className="font-semibold text-center text-3xl mb-2.5"
        >
          10:00 - 19:00
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("tel:0808657569");
        }}
        className="py-4 mt-12 flex flex-row items-center space-x-2 justify-center bg-sky-500 w-full rounded"
      >
        <Icon name="call" color="#fff" size={20} />
        <Text
          style={{
            fontFamily: "poppins-semibold",
          }}
          className="text-white text-center uppercase"
        >
          Call Us
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("https://wa.me/212808657569");
        }}
        className="py-4 mt-4 flex flex-row items-center space-x-2 justify-center bg-green-500 w-full rounded"
      >
        <Icon name="logo-whatsapp" color="#fff" size={20} />
        <Text
          style={{
            fontFamily: "poppins-semibold",
          }}
          className="text-white text-center uppercase"
        >
          Whatsapp
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
