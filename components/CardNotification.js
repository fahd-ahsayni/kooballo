import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";

export default function CardApps({ icon, title, text, color }) {
  return (
    <TouchableOpacity className="flex-row rounded-md mb-2.5 p-4 w-full bg-white border border-gray-100">
      <View
        style={{
          backgroundColor: color,
        }}
        className="h-12 w-12 rounded-full flex items-center justify-center mr-4"
      >
        <Icon name={icon} size={32} color="#fff" />
      </View>
      <View>
        <Text
          style={{ fontFamily: "poppins-semibold", color: Colors.text }}
          className="mb-0.5 text-lg"
        >
          {title}
        </Text>
        <Text
          style={{ fontFamily: "poppins-regular", color: Colors.dark }}
          className="mb-3 text-xs text-gray-500"
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
