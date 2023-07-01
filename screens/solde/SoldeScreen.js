import { Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import CardCredit from "../../assets/icons/card.png";
import Store from "../../assets/icons/store.png";
import { View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import {t} from "../../i18n"

export default function SoldeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-6 justify-center items-center">
      <Text
        className="text-center text-2xl"
        style={{ fontFamily: "poppins-semibold" }}
      >
        {t("Solde.Title")}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("with cash")} className="border mt-16 py-3 w-full border-gray-200 rounded-lg bg-white">
        <View className="flex-row justify-center items-center">
          <Image
            source={Store}
            resizeMode="cover"
            className="w-12 h-12 mr-4"
          />
          <Text
            className="text-lg"
            style={{
              fontFamily: "poppins-semibold",
            }}
          >
            <Text className="text-sky-500">{t("Solde.ByCash")}</Text>
            <Text className="text-white"> ( Soon )</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="border mt-8 py-3 w-full border-gray-200 rounded-lg bg-white">
        <View className="flex-row justify-center items-center">
          <Image
            source={CardCredit}
            resizeMode="cover"
            className="w-12 h-12 mr-4"
          />
          <Text
            className="text-lg"
            style={{
              fontFamily: "poppins-semibold",
            }}
          >
            <Text className="text-sky-500">{t("Solde.ByCredit")}</Text>
            <Text className="text-gray-600"> ( {t("Solde.Soon")} )</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
