import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Text, VStack } from "native-base";
import { supabase_customer } from "../../supabase/supabase-customer";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { fetchChateau } from "../../redux/chateauSlice";

import Tank from "../../assets/icons/chateau.png";

export default function TanksScreen() {
  const navigation = useNavigation();
  const chateauData = useSelector((state) => state.chateau.entities);
  const loading = useSelector((state) => state.chateau.loading);
  const profileData = useSelector((state) => state.profiles);

  const dispatch = useDispatch();

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchChateau(profileData.id));
    }
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchChateau(profileData.id));
  };

  const CardChateau = ({ chateau }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleDeleteChateau = async () => {
      try {
        const { error } = await supabase_customer
          .from("chateau")
          .delete()
          .eq("id", chateau.id);

        if (error) {
          console.error("Error deleting chateau:", error);
        } else {
          console.log("Chateau deleted successfully");
          dispatch(fetchChateau(profileData.id));
        }
      } catch (error) {
        console.error("Error deleting chateau:", error.message);
      }
    };

    return (
      <TouchableOpacity
      onPress={() => navigation.navigate("edit the tank", { id: chateau.id })}
      className="flex-row border border-gray-200 p-3 space-x-3 mb-4 rounded-md"
    >
      <View className="relative w-28 h-24">
        {isLoading && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size="lg" color={Colors.primary} />
          </View>
        )}
        <Image
          source={{ uri: chateau.chateau_profile }}
          style={{ resizeMode: "cover" }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          className="absolute w-full h-full rounded"
        />
      </View>
      <VStack flex={1} space={1}>
        <Text style={{ fontFamily: "poppins-semibold" }}>{chateau.name}</Text>
        <Text style={{ fontFamily: "poppins-regular" }} color="gray.500">
          {chateau.city}
        </Text>
        <Text style={{ fontFamily: "poppins-regular" }} color="gray.500">
          {chateau.litres} L
        </Text>
      </VStack>
      <TouchableOpacity
        className="justify-center items-center"
        onPress={handleDeleteChateau}
      >
        <View className="bg-rose-500 p-2.5 rounded-full">
          <Icon name="trash-outline" color="#fff" size={22} />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


  return (
    <SafeAreaView className="relative justify-start pt-16 flex-1 h-full bg-white">
      <View className="h-20 relative w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4"
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
      <View
        className="w-full -ml-1.5"
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "poppins-semibold",
            color: Colors.text,
            textAlign: "left",
          }}
          className="px-6 py-2"
        >
          Your Chateaus
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "poppins-regular",
            textAlign: "left",
          }}
          className="px-6 py-2 text-gray-500"
        >
          Scroll to refrech
        </Text>
      </View>

      <FlatList
        className="px-4"
        data={chateauData}
        renderItem={({ item }) => <CardChateau key={item.id} chateau={item} />}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl
            refreshing={loading === "loading"}
            onRefresh={onRefresh}
          />
        }
      />

      <View className="absolute bottom-5 right-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("add new tank")}
          style={{
            width: 68,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            backgroundColor: Colors.primary,
          }}
        >
          <Icon name="add" size={35} color="white" />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Image
          source={Tank}
          resizeMode="contain"
          className="w-64 h-64 absolute -z-20 bottom-6 opacity-10"
        />
      </View>
    </SafeAreaView>
  );
}
