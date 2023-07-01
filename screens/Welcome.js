import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { t } from "../i18n";
import { switchLanguage } from "../redux/languageSlice";
import { useDispatch } from "react-redux";
import { Image } from "react-native";

import morocco from "../assets/icons/morocco.png";
import france from "../assets/icons/france.png";
import uk from "../assets/icons/uk.png";

const { height } = Dimensions.get("window");

export default function Welcome() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
      <StatusBar style="auto" />
      <View>
        <ImageBackground
          style={{
            height: height / 4,
          }}
          resizeMode="contain"
          source={require("../assets/images/kooballo.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 4,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.darkText,
              textAlign: "center",
              fontFamily: "poppins-bold",
            }}
          >
            {t("Welcome.title")}
          </Text>
        </View>

        <View className="flex-row w-full mt-8 justify-evenly">
          <TouchableOpacity
            className="border justify-center items-center border-gray-200 rounded"
            style={{
              height: height / 9,
              width: height / 9,
            }}
            onPress={() => dispatch(switchLanguage("ar"))}
          >
            <Image
              source={morocco}
              resizeMode="cover"
              style={{
                height: height / 20,
                width: height / 20,
              }}
            />
            <Text
              className="text-center text-sm mt-2 font-bold"
              style={{
                fontFamily: "poppins-bold",
              }}
            >
              العربية
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border justify-center items-center border-gray-200 rounded"
            style={{
              height: height / 9,
              width: height / 9,
            }}
            onPress={() => dispatch(switchLanguage("en"))}
          >
            <Image
              source={uk}
              resizeMode="cover"
              style={{
                height: height / 20,
                width: height / 20,
              }}
            />
            <Text
              className="text-center text-xs mt-2"
              style={{
                fontFamily: "poppins-bold",
              }}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="border justify-center items-center border-gray-200 rounded"
            style={{
              height: height / 9,
              width: height / 9,
            }}
            onPress={() => dispatch(switchLanguage("fr"))}
          >
            <Image
              source={france}
              resizeMode="cover"
              style={{
                height: height / 20,
                width: height / 20,
              }}
            />

            <Text
              className="text-center text-xs mt-2"
              style={{
                fontFamily: "poppins-bold",
              }}
            >
              Français
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full px-6 mt-12">
          <TouchableOpacity
            onPress={() => navigation.navigate("Authentication")}
            style={{
              backgroundColor: Colors.primary,
              height: 64,
              borderRadius: 64,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexDirection: "row",
              padding: 12,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowColor: Colors.primary,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#fff",
                paddingHorizontal: 16,
              }}
            >
              {t("Welcome.button")}
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
              <Icon name="arrow-forward" size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
