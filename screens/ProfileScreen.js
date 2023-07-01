import { VStack, Box, Avatar, Text, HStack, View } from "native-base";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import Spacing from "../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import QrCode from "../components/QrCode";

const { height } = Dimensions.get("window");

export default function ProfileScreen() {
  const navigation = useNavigation();
  const profileData = useSelector((state) => state.profiles);

  const BoxInfo = ({ title, text }) => (
    <HStack
      className="border border-gray-200 rounded-lg"
      justifyContent="space-between"
      bg="white"
      p={4}
      alignItems="center"
      my={2}
    >
      <View className="flex-row justify-between w-full">
        <Text fontSize="sm" fontFamily="poppins-semibold">
          {title}
        </Text>
        <Text fontSize="sm" color="gray.500" fontFamily="poppins-regular">
          {text}
        </Text>
      </View>
    </HStack>
  );

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-50">
      <VStack alignItems="center" w="100%" space={4}>
        <Avatar
          source={{
            uri: profileData?.avatar_url,
          }}
          size="2xl"
        />

        <View className="w-full items-center">
          <View className="bg-white border border-gray-200 rounded-lg flex-row w-1/2 py-3.5 items-center justify-around px-3">
            <Icon name="wallet" size={24} color={Colors.primary} />
            <Text fontFamily="poppins-semibold" className="text-lg">
              {profileData.solde} Dhs
            </Text>
          </View>
        </View>

        <Box p={4} borderRadius="xl" w="100%">
          <BoxInfo title="Full Name" text={profileData?.full_name} />
          <View className="h-[1px] w-full bg-gray-200" />
          <BoxInfo title="Mobile" text={profileData?.mobile} />
        </Box>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="-mt-4"
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "poppins-semibold",
              color: Colors.text,
            }}
            className="px-6 mt-2.5"
          >
            Your Qr Code
          </Text>
        </View>

        <QrCode value={profileData.id.toString()} size={height / 5} />

        <View className="px-6 w-full mt-2.5">
          <TouchableOpacity
            onPress={() => navigation.navigate("edit profile")}
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
                fontFamily: "poppins-semibold",
              }}
            >
              Edit Your Information ?
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
              <Icon name="pencil" size={22} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </VStack>
    </SafeAreaView>
  );
}
