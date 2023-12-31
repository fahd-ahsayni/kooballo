import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import Cancel from "../assets/icons/cross.png";
import { useNavigation } from "@react-navigation/native";
import { t } from "../i18n";
export default function CancelOrder() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Image source={Cancel} resizeMode="cover" className="w-16 h-16 mb-8" />
      <Text
        className="text-3xl text-center text-rose-600"
        style={{ fontFamily: "poppins-bold" }}
      >
        {t("CancelOrder.InsufficientSolde")}
      </Text>

      <Text
        className="text-lg text-center text-gray-600"
        style={{ fontFamily: "poppins-bold" }}
      >
        {t("CancelOrder.Message")}
      </Text>

      <View className="w-full px-12">
        <TouchableOpacity
          onPress={() => navigation.navigate("solde")}
          className="w-full items-center mt-6 bg-sky-500 rounded-lg"
        >
          <Text
            className="text-white py-3"
            style={{ fontFamily: "poppins-semibold" }}
          >
            {t("CancelOrder.ButtonRecharge")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-full items-center mt-2.5 bg-gray-200 rounded-lg"
        >
          <Text
            className="text-gray-700 py-3"
            style={{ fontFamily: "poppins-semibold" }}
          >
            {t("CancelOrder.ButtonCancel")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
