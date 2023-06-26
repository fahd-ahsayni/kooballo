import React, { useState } from "react";
import { Button, View,  Input, FormControl } from "native-base";
import { supabase_customer } from "../supabase/supabase-customer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

export default function EditProfile() {
  const navigation = useNavigation();
  const profileData = useSelector((state) => state.profiles);
  const [fullName, setFullName] = useState(profileData.full_name);
  const [mobile, setMobile] = useState(profileData.mobile);

  const onSubmit = async () => {
    try {
      const { error } = await supabase_customer
        .from("profiles")
        .update({ full_name: fullName, mobile })
        .eq("id", profileData.id);
      if (error) throw error;
      navigation.navigate("success", { text: "Profile Updated Successfylly" });
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <SafeAreaView className="bg-gray-50 justify-center flex-1 px-4">
      <View>
        <FormControl>
          <FormControl.Label>Chateau name</FormControl.Label>
          <Input
            className="py-3"
            placeholder="Full Name"
            keyboardType="default"
            style={{ fontFamily: "poppins-regular" }}
            value={fullName}
            onChangeText={setFullName}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Chateau name</FormControl.Label>
          <Input
            className="py-3"
            placeholder="Full Name"
            keyboardType="default"
            style={{ fontFamily: "poppins-regular" }}
            value={fullName}
            onChangeText={setFullName}
          />
        </FormControl>

        <Input
          value={mobile}
          onChangeText={setMobile}
          placeholder="Mobile"
          keyboardType="numeric"
        />
        <Button onPress={onSubmit}>Update</Button>
      </View>
    </SafeAreaView>
  );
}
