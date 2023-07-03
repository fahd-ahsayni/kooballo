import { View, Text, SafeAreaView, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import Colors from "../constants/Colors";

import Clock from "../assets/icons/clock.png";
import { useNavigation } from "@react-navigation/native";
import { t } from "../i18n";

export default function SupportScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 w-full pt-16 bg-white px-6 justify-start items-center">
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

      <View className="w-11/12 items-center">
        <Text
          style={{
            fontFamily: "poppins-semibold",
          }}
          className="mb-8 text-slate-600 text-center text-xl"
        >
          {t("Support.Title")}
        </Text>
        <Image source={Clock} resizeMode="cover" className="h-20 w-20" />
        <View className="border mt-8 rounded border-sky-600 py-2.5 w-full">
          <Text
            style={{
              fontFamily: "poppins-semibold",
            }}
            className="font-semibold text-xl text-center mb-2.5"
          >
            {t("Support.Monday")} - {t("Support.Saturday")}
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
            {t("Support.CallUs")}
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
            {t("Support.Whatsapp")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
