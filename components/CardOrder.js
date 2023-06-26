import { format } from "date-fns";
import { Badge } from "native-base";
import { TouchableOpacity } from "react-native";
import { View, Text, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function CardOrder({
  id,
  chateau_name,
  chateau_litres,
  chateau_street,
  chateau_quarter,
  chateau_city,
  chateau_house,
  is_complete,
  order_key,
  created_at,
  avatar_url,
  price,
  onDelete
}) {
  return (
    <View className="rounded-3xl mb-4 overflow-hidden w-full">
      <ImageBackground
        source={{
          uri: avatar_url,
        }}
        className="w-full"
      >
        <View className="absolute w-full h-full inset-0 bg-sky-800/70" />
        <View className="p-3">
          <View className="flex-row pb-2.5 pt-8">
            <Text
              style={{ fontFamily: "poppins-semibold" }}
              className="text-xl mr-2.5 text-white"
            >
              {chateau_name}
            </Text>
            <Badge
              colorScheme={is_complete ? "success" : "yellow"}
              alignSelf="center"
              variant="solid"
              className="rounded py-1"
            >
              <Text
                style={{ fontFamily: "poppins-regular" }}
                className="text-xs text-white font-semibold px-2.5"
              >
                {is_complete ? "Completed" : "waiting"}
              </Text>
            </Badge>
          </View>
          <Text
            style={{ fontFamily: "poppins-semibold" }}
            className="text-white font-semibold text-sm"
          >
            {chateau_litres} L
          </Text>
          <Text
            style={{ fontFamily: "poppins-regular" }}
            className="text-white text-sm"
          >
            {`${chateau_street} ${chateau_quarter} N°${chateau_house}, ${chateau_city} `}
          </Text>

          <Badge
            className="bg-white right-0 absolute py-2 px-6"
            borderColor="white"
            alignSelf="center"
            variant="outline"
          >
            <View className="flex-row">
              <Icon name="key-outline" size={16} />
              <Text
                style={{ fontFamily: "poppins-semibold" }}
                className="font-semibold ml-2.5 text-black"
              >
                {order_key}
              </Text>
            </View>
          </Badge>
          <View className="w-full flex-row items-center justify-between mt-4">
            <Text
              style={{ fontFamily: "poppins-bold" }}
              className="text-start text-lg text-white"
            >
              {" "}
              {price} DH
            </Text>

            <Text
              style={{ fontFamily: "poppins-semibold" }}
              className="text-white text-xs text-end"
            >
              {format(new Date(created_at), "d MMM, yyyy h:mm aa")}
            </Text>
          </View>
        </View>
        <View className="px-12 mb-4">
          <TouchableOpacity
          onPress={() => onDelete(id)}
            className="w-full bg-rose-600"
            style={{
              height: 52,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexDirection: "row",
              padding: 6,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: "#fff",
                paddingHorizontal: 10,
                fontFamily: "poppins-semibold",
              }}
            >
              Delete This Order
            </Text>

            <View
              style={{
                backgroundColor: "#fff",
                width: 30,
                aspectRatio: 1,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="trash-outline" size={20} color="#e11d48" />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
