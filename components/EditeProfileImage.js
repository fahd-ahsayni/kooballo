import React, { useState, useEffect } from "react";
import { View, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase_customer } from "../supabase/supabase-customer";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";

const { height } = Dimensions.get("window");

export default function EditProfileImage({ id }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const [photo, setPhoto] = useState(null);

  const defaultImage = useSelector((state) => state.mySlice.profileUrl);

  const avatarSize = { height: height / 5, width: height / 5 };

  const uploadAvatar = async (photo) => {
    const filePath = `${id}/profile.jpg`;

    await supabase_customer.storage
      .from("avatars")
      .upload(filePath, photo, { contentType: "image/jpeg" });
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "You need to grant camera roll permission to upload an image."
        );
        return;
      }

      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const photoData = {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: name,
        };
        setPhoto(photoData);
        await uploadAvatar(photoData);
        setAvatarUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image: ", error.message);
      Alert.alert("Error picking image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="w-full justify-center items-center pb-8">
      <TouchableOpacity onPress={handleImagePicker}>
        <Image
          source={{ uri: defaultImage }}
          accessibilityLabel="Avatar"
          style={avatarSize}
          className="rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}
