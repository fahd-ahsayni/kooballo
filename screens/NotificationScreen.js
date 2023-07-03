import { Spinner } from "native-base";
import { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import CardNotification from "../components/CardNotification";
import { supabase_customer } from "../supabase/supabase-customer";
import Colors from "../constants/Colors";
import NotificationBackground from "../assets/icons/notification.png";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { t } from "../i18n";

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [notificationsData, setNotificationsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase_customer
        .from("notifications")
        .select("*");

      if (error) throw error;

      setNotificationsData(data);
    } catch (error) {
      console.log("Error fetching chateaus:", error);
      setNotificationsData(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View className="h-full py-4 bg-white justify-center items-center">
        <Spinner size="lg" color="#0ea5e9" />
      </View>
    );
  }

  const renderItem = ({ item: notification }) => (
    <CardNotification {...notification} key={notification.id} />
  );


  return (
    <SafeAreaView className="pt-16 flex-1 items-center w-full bg-gray-50">
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
        className="w-full"
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
          className="px-6"
        >
         
        </Text>
      </View>

      <FlatList
        className="px-6 w-full"
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Image
        source={NotificationBackground}
        resizeMode="contain"
        className="w-64 h-64 absolute -z-20 bottom-6 opacity-10"
      />
    </SafeAreaView>
  );
}
