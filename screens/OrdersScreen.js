import React, { useEffect, useState, useCallback } from "react";
import { Button, Box, Spinner, VStack, FlatList } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

import CardOrder from "../components/CardOrder";
import { fetchOrders } from "../redux/ordersSlice";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import { supabase_customer } from "../supabase/supabase-customer";

export default function OrdersScreen() {
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState("all");

  const navigation = useNavigation();

  const profileData = useSelector((state) => state.profiles);
  const { data: ordersData, loading } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders(profileData?.id));
  }, [dispatch]);

  useEffect(() => {
    setFilteredOrders(ordersData);
  }, [ordersData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchOrders(profileData?.id)).then(() => setRefreshing(false));
  }, [dispatch]);

  const showAllOrders = () => {
    setButtonLoading(true);
    setFilteredOrders(ordersData);
    setSelectedButton("all");
    setButtonLoading(false);
  };

  const showWaitingOrders = () => {
    setButtonLoading(true);
    const waitingOrders = ordersData.filter(
      (order) => order.is_complete === false
    );
    setFilteredOrders(waitingOrders);
    setSelectedButton("waiting");
    setButtonLoading(false);
  };

  const showCompletedOrders = () => {
    setButtonLoading(true);
    const completedOrders = ordersData.filter(
      (order) => order.is_complete === true
    );
    setFilteredOrders(completedOrders);
    setSelectedButton("completed");
    setButtonLoading(false);
  };

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="white">
        <Spinner size="lg" color="#0ea5e9" />
      </Box>
    );
  }

  const deleteOrder = async (orderId) => {
    try {
      await supabase_customer
        .from("orders")
        .delete()
        .match({ id: orderId });
      // Refetch orders after delete
      dispatch(fetchOrders(profileData?.id));
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };
  

  return (
    <SafeAreaView className="flex-1 pt-8 bg-gray-50">
      <View className="h-20 relative w-full">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-4 top-6"
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
      <VStack className="flex-row items-center justify-evenly py-8">
        <Button
          style={
            selectedButton === "all"
              ? { backgroundColor: Colors.primary, borderWidth: 0 }
              : {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }
          }
          _text={
            selectedButton === "all"
              ? {
                  color: "#fff",
                  fontWeight: "bold",
                }
              : {
                  color: "#0ea5e9",
                  fontWeight: "bold",
                }
          }
          onPress={showAllOrders}
          isLoading={buttonLoading}
          loadingText="Loading"
          className="rounded-full px-6"
        >
          All Orders
        </Button>
        <Button
          style={
            selectedButton === "waiting"
              ? { backgroundColor: "#fbbf24", borderWidth: 0 }
              : {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }
          }
          _text={
            selectedButton === "waiting"
              ? {
                  color: "#fff",
                  fontWeight: "bold",
                }
              : {
                  color: "#fbbf24",
                  fontWeight: "bold",
                }
          }
          onPress={showWaitingOrders}
          isLoading={buttonLoading}
          loadingText="Loading"
          className="rounded-full px-6"
        >
          Waiting
        </Button>
        <Button
          style={
            selectedButton === "completed"
              ? { backgroundColor: "#16a34a", borderWidth: 0 }
              : {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }
          }
          _text={
            selectedButton === "completed"
              ? {
                  color: "#fff",
                  fontWeight: "bold",
                }
              : {
                  color: "#16a34a",
                  fontWeight: "bold",
                }
          }
          onPress={showCompletedOrders}
          isLoading={buttonLoading}
          loadingText="Loading"
          className="rounded-full px-6"
        >
          Completed
        </Button>
      </VStack>
      <FlatList
        className="px-5"
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardOrder key={item.id} {...item} onDelete={deleteOrder} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <View className="absolute bottom-5 right-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("create new order")}
          style={{
            width: 68,
            aspectRatio: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 52,
            backgroundColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Icon name="add" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
