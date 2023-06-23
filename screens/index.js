import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SupportScreen from "./SupportScreen";
import NotificationScreen from "./NotificationScreen";
import ShareScreen from "./ShareScreen";
import TanksScreen from "./chateau/TanksScreen";
import AddNewTankScreen from "./chateau/AddNewTankScreen";
import EditInforamtionsTank from "./chateau/EditInforamtionsTank";
import Success from "../components/Success";
import OrdersScreen from "./OrdersScreen";

const Stack = createNativeStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        options={{ headerShown: false }}
        name="home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="support"
        component={SupportScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="notifications"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="share"
        component={ShareScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="tanks"
        component={TanksScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="add new tank"
        component={AddNewTankScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="success"
        component={Success}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="edit the tank"
        component={EditInforamtionsTank}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="orders"
        component={OrdersScreen}
      />
    </Stack.Navigator>
  );
}
