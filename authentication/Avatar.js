import React, { useState, useEffect } from "react";
import { View, Alert, Image,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase_customer } from "../supabase/supabase-customer";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setProfileUrl } from "../redux/mySlice";
import { TouchableOpacity } from "react-native";

const { height } = Dimensions.get("window");

export default function Avatar({ url, name, id }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(url);
  const [photo, setPhoto] = useState(null);

  const dispatch = useDispatch();

  const defaultImage = useSelector((state) => state.mySlice.profileUrl);

  const avatarSize = { height: height / 5, width: height / 5 };

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  const downloadImage = async (url) => {
    try {
      const { data, error } = await supabase_customer.storage
        .from("avatars")
        .download(url);
      if (error) {
        throw error;
      }

      const urlObject = URL.createObjectURL(data);
      setAvatarUrl(urlObject);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    } finally {
      setUploading(false);
    }
  };

  const uploadAvatar = async (photo) => {
    const filePath = `${id}/profile.jpg`;

    await supabase_customer.storage
      .from("avatars")
      .upload(filePath, photo, { contentType: "image/jpeg" });

    const imageUrl = `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${filePath}`;

    dispatch(setProfileUrl(imageUrl));
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
      {avatarUrl ? (
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={avatarSize}
            className="rounded-full"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleImagePicker}>
          <Image
            onPress={handleImagePicker}
            source={{ uri: defaultImage }}
            style={avatarSize}
            accessibilityLabel="Avatar"
            resizeMode="cover"
            className="rounded-full"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}


