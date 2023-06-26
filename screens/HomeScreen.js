import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Text } from "native-base";

import { supabase_customer } from "../supabase/supabase-customer";
import SwiperSlide from "../components/SwiperSlide";

import { dataBottomCards, dataHeaderCards } from "../data";
import Colors from "../constants/Colors";
import { fetchProfile } from "../redux/profileSlice";
import Spacing from "../constants/Spacing";
import { setProfileUrl } from "../redux/mySlice";

const { height } = Dimensions.get("window");

function HomeScreen() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profiles);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase_customer.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    const handleAuthStateChange = async () => {
      supabase_customer.auth.onAuthStateChange(async (_event, session) => {
        setSession(session);
        setLoading(false);
      });
    };

    fetchSession();
    handleAuthStateChange();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (session) {
        dispatch(fetchProfile(session?.user.id));
      }
      dispatch(setProfileUrl(profileData?.avatar_url))
    }, [dispatch, session])
  );

  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", flex: 1 }}
      className="bg-gray-50 pt-8"
    >
      <View
        style={{
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
        >
          <Image
            source={{
              uri: profileData?.avatar_url,
            }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover"
            className="mr-2.5"
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {profileData ? (
            <>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 3,
                  color: Colors.text,
                  fontFamily: "poppins-semibold",
                }}
                numberOfLines={1}
              >
                {profileData?.full_name}
              </Text>
              <Text
                style={{
                  color: "#333",
                  opacity: 0.75,
                  fontFamily: "poppins-regular",
                }}
                numberOfLines={1}
              >
                Solde : {profileData?.solde} Dhs
              </Text>
            </>
          ) : (
            <>
              <Skeleton h="5" rounded="md" startColor="coolGray.200" />
              <Skeleton h="3" mt={3} rounded="md" startColor="coolGray.100" />
            </>
          )}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("profile")}
          style={{
            width: 42,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
        >
          <Icon name="qr-code-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("notifications")}
          style={{
            width: 42,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            borderWidth: 1,
            borderColor: Colors.darkText,
          }}
        >
          <Icon name="notifications" size={20} color={Colors.darkText} />
        </TouchableOpacity>
      </View>
      <SafeAreaView
        className="bg-gray-50"
        style={{ paddingVertical: 24, gap: 24 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "poppins-semibold",
              color: Colors.text,
            }}
            className="px-6 mt-2.5 -mb-2.5"
          >
            Welcome to Kooballo
          </Text>
        </View>

        <View
          style={{
            height: height / 4.3,
          }}
          className="mb-2.5 px-2"
        >
          <SwiperSlide />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: "poppins-semibold",
              color: Colors.text,
            }}
            className="px-6 -mb-2.5"
          >
            Menu
          </Text>
        </View>

        <View className="flex-col items-center justify-center w-full">
          <View className="flex flex-row space-x-4">
            {dataHeaderCards.map((item, key) => (
              <TouchableOpacity
                onPress={() =>
                  item.navigate ? navigation.navigate(item.navigate) : {}
                }
                key={key}
                className="flex border border-gray-200 items-center justify-center w-24 h-24 rounded bg-white"
              >
                <Image
                  source={item.icon}
                  resizeMode="cover"
                  className="w-10 h-10"
                />
                <Text
                  style={{ fontFamily: "poppins-semibold" }}
                  className="mt-2"
                  fontSize="sm"
                  color={Colors.primary}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="flex flex-row mt-4 space-x-4">
            {dataBottomCards.map((item, key) => (
              <TouchableOpacity
                onPress={() =>
                  item.navigate
                    ? navigation.navigate(item.navigate)
                    : supabase_customer.auth.signOut()
                }
                key={key}
                className="flex border border-gray-200 items-center justify-center w-24 h-24 rounded bg-white"
              >
                <Image
                  source={item.icon}
                  resizeMode="cover"
                  className="w-10 h-10"
                />
                <Text
                  style={{ fontFamily: "poppins-semibold" }}
                  className="mt-1"
                  fontSize="sm"
                  color={item.color ? item.color : "#cbd5e1"}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="w-full px-6">
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              height: 64,
              borderRadius: 64,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              flexDirection: "row",
              padding: 12,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              onPress={() => navigation.navigate("create new order")}
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#fff",
                paddingHorizontal: 16,
                fontFamily: "poppins-semibold",
              }}
            >
              Create New Order
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
              <Icon name="arrow-forward" size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;
