import { Text, SafeAreaView, Image } from "react-native";
import Check from "../../assets/icons/positive-vote.png";
import { useEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddSolde() {
  const navigation = useNavigation();
  const route = useRoute();

  const { value } = route.params;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView className="justify-center flex-1 items-center bg-white">
      <Image source={Check} className="h-24 mb-8 w-24" resizeMode="cover" />
      <Text
        className="text-5xl py-5 text-green-500"
        style={{
          fontFamily: "poppins-bold",
          textAlign: "center",
        }}
      >
        +{value} Dhs
      </Text>
    </SafeAreaView>
  );
}
