import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  Button,
  Input,
  VStack,
  Center,
  FormControl,
  Spinner,
} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { supabase_customer } from "../supabase/supabase-customer";
import Screens from "../screens";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

import Avatar from "./Avatar";
import { useSelector } from "react-redux";

export default function SetInfoStep({ session }) {
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [borderError, setBorderError] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [mobile, setMobile] = useState(null);

  const profileUrl = useSelector((state) => state.mySlice.profileUrl);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  useEffect(() => {
    setMobile(dataProfile?.mobile);
    setFullName(dataProfile?.full_name);
  }, [dataProfile]);

  // refrech Page

  const refreshPage = () => {
    setDataProfile(null);
    getProfile();
  };

  // get PROFILE data
  const getProfile = async () => {
    setLoading(true);

    if (!session?.user) {
      setFetchError("No user on the session!");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase_customer
      .from("profiles")
      .select()
      .eq("id", session?.user.id)
      .single();

    if (error) {
      setFetchError("Could not fetch profile");
      setDataProfile(null);
      setLoading(false);
    }

    if (data) {
      setDataProfile(data);
      setFetchError(null);
      setLoading(false);
    }
  };

  // function updates
  const updateProfile = () => {
    if (!fullName || !mobile) {
      setBorderError(true);
      return;
    }

    console.log(profileUrl);
    setLoading(true);

    const updates = {
      id: session?.user.id,
      full_name: fullName,
      mobile,
      avatar_url: profileUrl,
      updated_at: new Date(),
    };

    supabase_customer.from("profiles").upsert(updates).then(refreshPage);
  };

  return (
    <>
      {loading ? (
        <Center flex={1} bg="white">
          <Spinner color="#0284c7" size="lg" />
        </Center>
      ) : dataProfile?.full_name && dataProfile?.mobile ? (
        <Screens session={session} />
      ) : (
        <View className="px-6 flex-1 justify-center bg-white">
          <View>
            <Text className="text-2xl font-bold text-gray-800">
              Complete All Required Fields to Proceed !
            </Text>
            <Text>{fetchError}</Text>
          </View>
          <Avatar
            id={session?.user.id}
          />
          <Center>
            <VStack space={4} width="100%">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder="Email"
                  value={session?.user?.email}
                  bg="muted.100"
                  className="py-3 text-base"
                  style={{
                    fontFamily: "poppins-regular",
                  }}
                  keyboardType="email-address"
                  isReadOnly
                  borderColor={borderError ? "danger.600" : "muted.400"}
                  InputLeftElement={
                    <Button
                      size="xs"
                      rounded="none"
                      h="full"
                      className="bg-transparent -mr-2.5"
                    >
                      <Icon
                        name="mail"
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Full Name</FormControl.Label>
                <Input
                  value={fullName}
                  className="py-3 text-base"
                  style={{
                    fontFamily: "poppins-regular",
                  }}
                  keyboardType="email-address"
                  onChangeText={(text) => setFullName(text)}
                  borderColor={borderError ? "danger.600" : "muted.400"}
                  InputLeftElement={
                    <Button
                      size="xs"
                      rounded="none"
                      h="full"
                      className="bg-transparent -mr-2.5"
                    >
                      <Icon
                        name="person"
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Mobile</FormControl.Label>
                <Input
                  label="Mobile"
                  keyboardType="phone-pad"
                  className="py-3 text-base"
                  style={{
                    fontFamily: "poppins-regular",
                  }}
                  value={mobile}
                  onChangeText={(text) => setMobile(text)}
                  borderColor={borderError ? "danger.600" : "muted.400"}
                  InputLeftElement={
                    <Button
                      size="xs"
                      rounded="none"
                      h="full"
                      className="bg-transparent -mr-2.5"
                    >
                      <Icon
                        name="call"
                        size={18}
                        color="#64748b"
                        className="h-full"
                      />
                    </Button>
                  }
                />
              </FormControl>
              <Button
                onPress={updateProfile}
                isLoading={loading}
                style={{
                  padding: Spacing * 1.2,
                  backgroundColor: Colors.primary,
                  marginVertical: Spacing * 3,
                  borderRadius: Spacing / 2,
                  shadowColor: Colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: Spacing,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: Spacing,
                }}
              >
                <Text
                  style={{
                    fontFamily: "poppins-semibold",
                    color: Colors.onPrimary,
                    textAlign: "center",
                    fontSize: FontSize.medium,
                  }}
                >
                  Update Profile
                </Text>
              </Button>
            </VStack>
          </Center>
        </View>
      )}
    </>
  );
}
