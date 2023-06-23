import { format } from "date-fns";
import { Badge } from "native-base";
import { View, Text, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


export default function CardOrder({
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
}) {

  return (
    <View className="rounded mb-4 overflow-hidden w-full">
      <ImageBackground
        source={{
          uri: avatar_url,
        }}
        className="w-full h-48"
      >
        <View className="absolute w-full h-full inset-0 bg-gray-800/70" />
        <View className="w-full flex-row justify-between items-center p-4">
          <Badge
            className="bg-white py-2 px-6 rounded"
            alignSelf="center"
            variant="outline"
          >
            <View className="flex-row">
              <Icon name="key-outline" size={16} />
              <Text className="font-semibold ml-2.5 text-black">
                {order_key}
              </Text>
            </View>
          </Badge>
          <Badge
            colorScheme={is_complete ? "success" : "warning"}
            alignSelf="center"
            variant="solid"
            className="rounded py-1.5"
          >
            <Text className="text-white font-semibold px-6">
              {is_complete ? "Completed" : "waiting"}
            </Text>
          </Badge>
        </View>
        <View className="absolute w-full  inset-x-0 bottom-0 flex items-start justify-between p-4">
          <View>
            <Text className="text-xl text-white font-bold">{chateau_name}</Text>
            <Text className="text-white font-semibold text-sm">
              {chateau_litres} L
            </Text>
            <Text className="text-white text-sm">
              {`${chateau_street} ${chateau_quarter} N°${chateau_house}, ${chateau_city} `}
            </Text>
            <View className="w-full flex-row justify-between mt-4">
              <Badge className="bg-sky-500 rounded">
                <Text className="px-4 text-white font-semibold">
                  {" "}
                  {price} DH
                </Text>
              </Badge>
              <Text className="text-white mt-4 text-xs text-end">
                {format(new Date(created_at), "d MMM, yyyy h:mm aa")}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
