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
import CreateNewOrder from "./CreateNewOrder";
import ProfileScreen from "./ProfileScreen";
import EditProfile from "./EditProfile";
import SoldeScreen from "./solde/SoldeScreen";
import CancelOrder from "../components/CancelOrder";
import QrScanner from "./solde/QrScanner";
import AddSolde from "./solde/AddSolde";
import WithCash from "./solde/WithCash";

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
      <Stack.Screen
        options={{ headerShown: false }}
        name="create new order"
        component={CreateNewOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="edit profile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="solde"
        component={SoldeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="with cash"
        component={WithCash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="add solde"
        component={AddSolde}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="cancel order"
        component={CancelOrder}
      />
    </Stack.Navigator>
  );
}
