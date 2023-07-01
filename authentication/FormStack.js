import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./forms/LoginScreen";
import RegisterScreen from "./forms/RegisterScreen";
import ForgotPasswordScreen from "./forms/ForgoatPassword";

const Stack = createNativeStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="forgoat password"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
