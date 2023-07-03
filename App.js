import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Authentication from "./authentication/Authentication";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";
import NoNet from "./components/NoNet";
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo"; // Don't forget to install this package

const Stack = createNativeStackNavigator();

function App() {
  const [noNet, setNoNet] = useState(false);

  let [fontsLoaded] = useFonts({
    "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setNoNet(true)
      }
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded) return <></>;

  if (noNet) return <NoNet />

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
          <Stack.Screen
            options={{ headerShown: false }}
            name="NoInternet"
            component={NoNet}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
