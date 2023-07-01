
import React from "react";
import { Box } from "native-base";
import QRCode from "react-native-qrcode-svg";
import Colors from "../constants/Colors";

export default function QrCode({value, size}) {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="xl"
      borderColor="gray.200"
      borderWidth={2}
    >
      <QRCode
        value={value}
        size={size}
        backgroundColor="white"
        color={Colors.primary}
      />
    </Box>
  );
}
