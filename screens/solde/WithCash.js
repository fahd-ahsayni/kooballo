import { View, Text, SafeAreaView, Dimensions } from "react-native";
import QrCode from "../../components/QrCode";
import { useSelector } from "react-redux";
import FontSize from "../../constants/FontSize";

import { t } from "../../i18n";

const { height } = Dimensions.get("window");

export default function WithCash() {
  const profileData = useSelector((state) => state.profiles);

  return (
    <SafeAreaView className="flex-1 px-6 justify-center items-center">
      <Text
        style={{
          fontFamily: "poppins-semibold",
          fontSize: FontSize.xLarge,
          textAlign: "center",
        }}
        className="mb-8 capitalize"
      >
        {t("ByCash.Title")}
      </Text>
      <QrCode value={profileData.id.toString()} size={height / 3} />
    </SafeAreaView>
  );
}
