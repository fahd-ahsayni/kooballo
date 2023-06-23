import { Text, SafeAreaView, Image } from "react-native";
import Check from "../assets/icons/check.png";
import { useEffect } from "react";
import { fetchChateau } from "../redux/chateauSlice";
import { useDispatch, useSelector } from "react-redux";
import FontSize from "../constants/FontSize";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Success() {
  const navigation = useNavigation();
  const profileData = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const route = useRoute();

  const { text } = route.params;
  useEffect(() => {
    dispatch(fetchChateau(profileData?.id));

    const timer = setTimeout(() => {
      navigation.navigate("home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <SafeAreaView className="justify-center flex-1 items-center bg-white">
      <Image source={Check} className="h-24 mb-8 w-24" resizeMode="cover" />
      <Text
        style={{
          fontFamily: "poppins-bold",
          fontSize: FontSize.xLarge,
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </SafeAreaView>
  );
}
