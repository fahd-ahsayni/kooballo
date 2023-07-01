import { format } from "date-fns";
import { Badge, HStack } from "native-base";
import { Image } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { t } from "../i18n";

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
  onDelete,
}) {
  return (
    <View className="border-2 mb-8 rounded-lg overflow-hidden border-gray-200">
      <Image
        source={{
          uri: avatar_url,
        }}
        className="w-full h-40"
        resizeMode="cover"
      />

      <View style={styles.container} className="items-start">
        <Text style={styles.time}>
          {format(new Date(created_at), "d MMM, yyyy h:mm aa")}
        </Text>

        <HStack>
          <Text
            style={{
              marginTop: 2,
              fontSize: 18,
              fontFamily: "poppins-semibold",
            }}
          >
            {chateau_name}
          </Text>
          <Badge
            alignSelf="center"
            variant="solid"
            className={`${
              is_complete ? "bg-green-500" : "bg-yellow-500"
            } rounded-full py-1 ml-2.5`}
          >
            <Text
              style={{ fontFamily: "poppins-regular" }}
              className="text-xs text-white font-semibold px-2.5"
            >
              {is_complete ? t("Orders.Completed") : t("Orders.Waiting")}
            </Text>
          </Badge>
        </HStack>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "poppins-regular",
          }}
        >
          {`${chateau_street} ${chateau_quarter} N°${chateau_house}, ${chateau_city} `}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "poppins-regular",
          }}
        >
          {chateau_litres} {t("CreateChateau.Litres")}
        </Text>

        <View style={styles.tagContainer}>
          <Text className="px-6 py-1" style={styles.tag}>
            {price} DH
          </Text>
          <Text className="px-6 py-1 tracking-widest" style={styles.tag}>
            {order_key}
          </Text>
        </View>
      </View>
      <View className="px-4 w-full mb-4">
        <TouchableOpacity
          onPress={() => onDelete(id)}
          className="w-full rounded bg-rose-600"
          style={{
            height: 52,
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
            {t("Orders.DeleteButton")}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  time: {
    fontSize: 12,
    color: "#888888",
    fontFamily: "poppins-regular",
  },

  tagContainer: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    backgroundColor: "#e0f2fe",
    fontSize: 14,
    fontFamily: "poppins-semibold",
    color: "#0ea5e9",
    borderRadius: 9999, // To make it fully round
  },
});
