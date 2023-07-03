import React, { useState, useCallback } from "react";
import {
  View,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { supabase_customer } from "../supabase/supabase-customer";
import { setProfileUrl } from "../redux/mySlice";

import { t } from "../i18n";

const avatarSize = Dimensions.get("window").height / 5;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
  },
  image: {
    height: avatarSize,
    width: avatarSize,
    borderRadius: avatarSize / 2,
  },
  text: {
    color: Colors.primary,
    marginLeft: 2.5,
    fontFamily: "poppins-regular",
  },
});

export default function EditProfileImage({ id, name }) {
  const [uploading, setUploading] = useState(false);
  const profileUrl = useSelector((state) => state.mySlice.profileUrl);
  const fallbackImageUrl = useSelector((state) => state.profiles.avatar_url);
  const dispatch = useDispatch();

  const uploadAvatar = useCallback(
    async (photo) => {
      const filePath = `${id}/${new Date()}.jpg`;
      try {
        await supabase_customer.storage
          .from("avatars")
          .upload(filePath, photo, { contentType: "image/jpeg" });

        const imageUrl = `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${filePath}`;
        dispatch(setProfileUrl(imageUrl));

        await supabase_customer
          .from("profile")
          .update({ avatar_url: imageUrl })
          .eq("id", id);
      } catch (error) {
        console.error("Error uploading image: ", error.message);
        Alert.alert("Error uploading image");
      }
    },
    [id, dispatch]
  );

  const handleImagePicker = useCallback(async () => {
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
    try {
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
        await uploadAvatar(photoData);
      }
    } catch (error) {
      console.error("Error picking image: ", error.message);
      Alert.alert("Error picking image");
    } finally {
      setUploading(false);
    }
  }, [uploadAvatar, name]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker}>
        <Image
          source={{ uri: profileUrl || fallbackImageUrl }}
          style={styles.image}
          accessibilityLabel="Avatar"
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View className="flex-row bg-sky-100 px-4 py-1.5 rounded mt-2.5 items-center">
        <Icon
          name="information-circle-outline"
          size={15}
          color={Colors.primary}
        />
        <Text
          className="text-sky-500 ml-2.5"
          style={{ fontFamily: "poppins-regular" }}
        >
          {t("UpdateProfile.EditPictureText")}
        </Text>
      </View>
    </View>
  );
}
