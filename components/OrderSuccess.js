import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function OrderSuccess() {
  const route = useRoute();
  const { price } = route.params;

  return (
    <View>
      <Text>{price}</Text>
    </View>
  );
}
