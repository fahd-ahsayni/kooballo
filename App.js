import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Authentication from "./authentication/Authentication";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) return <></>;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Authentication"
            component={Authentication}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
