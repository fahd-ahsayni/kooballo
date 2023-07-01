import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Alert,
  Image,
  SafeAreaView,
  Text,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  Center,
  FormControl,
  Input,
  VStack,
  Select,
  CheckIcon,
  Spinner,
  IconButton,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase_customer } from "../../supabase/supabase-customer";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

export default function AddNewTankScreen() {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [cities, setCities] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [name, setName] = useState();
  const [quarter, setQuarter] = useState("");
  const [house, setHouse] = useState("");
  const [litres, setLitres] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [inputWithError, setInputWithError] = useState("");
  const [buttonText, setButtonText] = useState("Add Your Chateau");

  const navigation = useNavigation();
  const userID = useSelector((state) => state.profiles?.id);

  useEffect(() => {
    setInputWithError("");
  }, []);

  const showError = (message, field) => {
    setFetchError(message);
    setInputWithError(field);
  };

  const fetchCitiesFromDB = useCallback(async () => {
    try {
      const { data, error } = await supabase_customer
        .from("cities")
        .select("*");

      if (error) {
        throw error;
      }

      setCities(data);
    } catch (error) {
      console.error("Error fetching cities: ", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCitiesFromDB();
  }, [fetchCitiesFromDB]);

  const fetchLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showError("Permission to access location was denied", "location");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLocation();
    }, 1000);
    return () => clearTimeout(timer);
  }, [fetchLocation]);

  const validateInputs = () => {
    if (!name) {
      showError("Chateau name field is required", "name");
      return false;
    }

    if (!city) {
      showError("City field is required", "city");
      return false;
    }

    if (!quarter) {
      showError("Quarter field is required", "quarter");
      return false;
    }

    if (isNaN(litres) || Number(litres) <= 100) {
      showError("Litres must be a number greater than 100", "litres");
      return false;
    }

    if (!photo) {
      showError("Photo of the house is required", "photo");
      return false;
    }

    return true;
  };

  const handleAddChateau = async () => {
    setButtonText("Please Wait ...");  // Change button text when clicked
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      setButtonText("Add Your Chateau");  // Change back to original text if validation fails
      return;
    }

    const filePath = `${userID}/${Date.now()}.jpg`;

    try {
      const { error } = await supabase_customer.storage
        .from("avatars")
        .upload(filePath, photo, { contentType: "image/jpeg" });

      if (error) {
        throw error;
      }

      const insertData = {
        name,
        street,
        quarter,
        house,
        litres,
        city,
        latitude,
        longitude,
        customer_id: userID,
        chateau_profile: `https://xnhwcsmrleizinqhdbdy.supabase.co/storage/v1/object/public/avatars/${filePath}`,
      };

      const { data, error: insertError } = await supabase_customer
        .from("chateau")
        .insert([insertData]);

      if (insertError) {
        showError("An error occurred while processing your order", "");
      }

      if (data) {
        setFetchError(null); // Clear error message
        setInputWithError(""); // Clear input with error
        setLoading(false);
      }
    } catch (err) {
      console.error("Error: ", err.message);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
      setButtonText("Add Your Chateau");  // Change back to original text once processing is done
      setTimeout(() => {
        navigation.navigate("success", { text: "Chateau update successfully" });
      }, 100);
    }
  };

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

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  const takePhoto = async () => {
    try {
      setUploading(true);

      let result = await launchCameraAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result) {
        const photo = {
          uri: result.assets[0].uri,
          type: "image/jpeg",
          name: name,
        };
        setPhoto(photo);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error taking photo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="justify-center flex-1 px-4 pt-12 bg-white">
      <View className="h-16 relative w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0"
          style={{
            width: 52,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
        >
          <Icon name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="mt-6">
          <View className="px-2">
            <Text
              style={{ fontFamily: "poppins-semibold" }}
              className="text-2xl"
            >
              Please complete all fields to add your Chateau information.
            </Text>
            {fetchError && (
              <View className="bg-yellow-100 flex items-center rounded my-4">
                <View className="mt-2.5 flex flex-row items-center justify-center mb-4">
                  <Icon name="alert-circle-outline" size={24} color="#b45309" />
                  <Text className="pl-2 text-amber-700 font-regular">
                    {fetchError}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <Center className="py-8">
            <VStack space={4} width="94%">
              <FormControl isRequired isInvalid={inputWithError == "name"}>
                <FormControl.Label>Chateau name</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Home Chateau or work chateau ..."
                  keyboardType="default"
                  style={{ fontFamily: "poppins-regular" }}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </FormControl>

              <VStack space={4}>
                <FormControl.Label className="-mb-4">City</FormControl.Label>
                <Select
                  borderColor={
                    inputWithError == "city" ? "red.500" : "muted.300"
                  }
                  w="100%"
                  className="py-3"
                  selectedValue={city}
                  accessibilityLabel="Choose City"
                  placeholder="Choose City"
                  style={{ fontFamily: "poppins-regular" }}
                  _selectedItem={{
                    bg: "#0ea5e9",
                    endIcon: <CheckIcon color="#fff" size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setCity(itemValue)}
                >
                  {cities.map(({ id, name }) => (
                    <Select.Item key={id} label={name} value={name} />
                  ))}
                </Select>
              </VStack>

              <FormControl>
                <FormControl.Label>Street</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your street"
                  keyboardType="default"
                  value={street}
                  style={{ fontFamily: "poppins-regular" }}
                  onChangeText={(text) => setStreet(text)}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputWithError == "quarter"}>
                <FormControl.Label>Quarter</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your quarter"
                  keyboardType="default"
                  style={{ fontFamily: "poppins-regular" }}
                  value={quarter}
                  onChangeText={(value) => setQuarter(value)}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>House N°</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter your house n°"
                  keyboardType="number-pad"
                  style={{ fontFamily: "poppins-regular" }}
                  value={house}
                  onChangeText={(value) => setHouse(value)}
                />
              </FormControl>

              <FormControl isRequired isInvalid={inputWithError == "litres"}>
                <FormControl.Label>Litres</FormControl.Label>
                <Input
                  className="py-3"
                  placeholder="Enter the number of litres"
                  keyboardType="number-pad"
                  style={{ fontFamily: "poppins-regular" }}
                  value={litres}
                  onChangeText={(value) => setLitres(value)}
                />
              </FormControl>

              {name && (
                <FormControl mt={8} isInvalid={inputWithError == "photo"}>
                  <FormControl.Label>
                    Please take a photo of the house!
                  </FormControl.Label>

                  {!uploading ? (
                    <>
                      {photo ? (
                        <View className="relative">
                          <Image
                            source={{ uri: photo.uri }}
                            accessibilityLabel="Avatar"
                            className="w-full rounded-md h-52"
                            style={{ resizeMode: "cover" }}
                          />
                          <View className="absolute w-full bottom-2.5 justify-center items-center">
                            <TouchableOpacity
                              className="rounded-full bg-green-500 py-2.5 px-6 flex-row justify-center items-center"
                              onPress={takePhoto}
                            >
                              <Text
                                className="text-white text-sm mr-2.5"
                                style={{ fontFamily: "poppins-semibold" }}
                              >
                                Edit This Photo
                              </Text>
                              <Icon
                                name="camera-reverse-outline"
                                color="#fff"
                                size={24}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : (
                        <IconButton
                          icon={
                            <Icon name="camera" size={40} color="#64748b" />
                          }
                          onPress={takePhoto}
                          size="lg"
                          isRound
                          className="bg-gray-100 h-52"
                        />
                      )}
                      {inputWithError == "photo" && (
                        <FormControl.ErrorMessage>
                          Photo of the house is required
                        </FormControl.ErrorMessage>
                      )}
                    </>
                  ) : (
                    <Center className="h-52">
                      <Spinner size="lg" color="#0ea5e9" />
                    </Center>
                  )}
                </FormControl>
              )}

              <View className="w-full justify-center items-center mt-8">
                <TouchableOpacity
                  onPress={handleAddChateau}
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
                    {loading ? "Please Wait ..." :"Add Your Chateau"}
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
                    <Icon
                      name="checkmark-done"
                      size={24}
                      color={Colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </VStack>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
