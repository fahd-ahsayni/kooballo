import React, { useState } from "react";
import { View, Input, FormControl, Box } from "native-base";
import { supabase_customer } from "../supabase/supabase-customer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { Text } from "react-native";
import { t } from "../i18n";

import EditProfileImage from "../components/EditeProfileImage";

export default function EditProfile() {
  const navigation = useNavigation();
  const profileData = useSelector((state) => state.profiles);
  const [fullName, setFullName] = useState(profileData.full_name);
  const [mobile, setMobile] = useState(profileData.mobile);

  const photo = useSelector((state) => state.mySlice.profileUrl);
  const success = t("UpdateProfile.success");

  const onSubmit = async () => {
    try {
      const { error } = await supabase_customer
        .from("profiles")
        .update({ full_name: fullName, mobile, avatar_url: photo })
        .eq("id", profileData.id);
      if (error) throw error;
      navigation.navigate("success", { text: success });
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <SafeAreaView className="bg-gray-50 justify-center flex-1 px-4">
      <Box p={4} borderRadius="xl" w="100%">
        <EditProfileImage id={profileData.id} name={profileData.full_name} />
        <FormControl className="mb-4">
          <FormControl.Label>
            {t("UpdateProfile.FullNameLabel")}
          </FormControl.Label>
          <Input
            className="py-3"
            placeholder={t("UpdateProfile.FullNameLabel")}
            keyboardType="default"
            style={{ fontFamily: "poppins-regular" }}
            value={fullName}
            onChangeText={setFullName}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>
            {t("UpdateProfile.MobileLabel")}
          </FormControl.Label>
          <Input
            className="py-3"
            placeholder={t("UpdateProfile.MobileLabel")}
            keyboardType="numeric"
            style={{ fontFamily: "poppins-regular" }}
            value={mobile}
            onChangeText={setMobile}
          />
        </FormControl>
        <View className="justify-center mt-8">
          <TouchableOpacity
            onPress={onSubmit}
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
              {t("UpdateProfile.ButtonUpdate")}
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
              <Icon name="checkmark-done" size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </Box>
    </SafeAreaView>
  );
}
