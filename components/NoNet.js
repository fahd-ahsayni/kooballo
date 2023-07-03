import { Text, SafeAreaView, Image, StyleSheet } from "react-native";
import NoWifi from "../assets/icons/no-wifi.png";
import FontSize from "../constants/FontSize";

export default function NoNet() {
  return (
    <SafeAreaView style={styles.container} className="px-4">
      <Image source={NoWifi} style={styles.image} resizeMode="cover" />
      <Text className="text-rose-600" style={styles.text}>
        No internet connection, please check and try again.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 126, // 24 * 4 because React Native doesn't support rem units
    width: 126, // same as above
    marginBottom: 32, // 8 * 4 because React Native doesn't support rem units
  },
  text: {
    fontFamily: "poppins-bold",
    fontSize: FontSize.xLarge,
    textAlign: "center",
  },
});
