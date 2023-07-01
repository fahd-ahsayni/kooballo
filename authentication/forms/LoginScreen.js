import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Stack,
  Input,
  Button,
  Box,
  FormControl,

} from "native-base";

import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import { supabase_customer } from "../../supabase/supabase-customer";
import { StatusBar } from "expo-status-bar";

import { t } from "../../i18n";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [signInError, setSignInError] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase_customer.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setSignInError(true);
    setLoading(false);
  }

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white flex-1 justify-center">
      <StatusBar style="auto" />
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: "poppins-bold",
              marginVertical: Spacing * 3,
            }}
            className="text-center"
          >
            {t("Login.title")}
          </Text>
          <Text
            style={{
              fontFamily: "poppins-semibold",
              fontSize: FontSize.large,
              maxWidth: "80%",
              textAlign: "center",
              color: Colors.darkText,
            }}
          >
            {t("Login.subtitle")}
          </Text>
        </View>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Box w="100%">
            <FormControl isRequired>
              <Stack>
                <View>
                  <FormControl.Label>{t("Login.emailLabel")}</FormControl.Label>
                  <Input
                    type="text"
                    placeholder={t("Login.inputEmailText")}
                    autoCapitalize="none"
                    borderWidth={1}
                    style={{
                      fontFamily: "poppins-regular",
                    }}
                    className="py-2.5"
                    borderColor={signInError ? "danger.600" : "muted.400"}
                    InputLeftElement={
                      <Button
                        size="xs"
                        rounded="none"
                        h="full"
                        className="bg-transparent -mr-2.5"
                      >
                        <Ionicons
                          name="mail"
                          size={18}
                          color="#64748b"
                          className="h-full"
                        />
                      </Button>
                    }
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                  />
                </View>

                <View className="mt-4">
                  <FormControl.Label>
                    {t("Login.passwordLabel")}
                  </FormControl.Label>
                  <Input
                    type={show ? "text" : "password"}
                    placeholder={t("Login.inputPasswordText")}
                    borderColor={signInError ? "danger.600" : "muted.400"}
                    className="py-2.5"
                    borderWidth={1}
                    style={{
                      fontFamily: "poppins-regular",
                    }}
                    InputLeftElement={
                      <Button
                        size="xs"
                        rounded="none"
                        h="full"
                        className="bg-transparent -mr-2.5"
                      >
                        <Ionicons
                          name="key"
                          size={18}
                          color="#64748b"
                          className="h-full"
                        />
                      </Button>
                    }
                    InputRightElement={
                      <Button
                        size="xs"
                        rounded="none"
                        w="1/6"
                        h="full"
                        className="bg-transparent py-2.5"
                        onPress={handleClick}
                      >
                        <Ionicons
                          name={show ? "eye-outline" : "eye-off-outline"}
                          size={18}
                          color="#64748b"
                          className="h-full"
                        />
                      </Button>
                    }
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                  />
                  <FormControl.HelperText>
                    {t("Login.inputPasswordHelperText")}
                  </FormControl.HelperText>
                </View>
              </Stack>
            </FormControl>
          </Box>
        </View>

        {/* <TouchableOpacity onPress={() => navigation.navigate("forgoat password")}>
          <Text
            style={{
              fontFamily: "poppins-semibold",
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            {t("Login.forgoatPassword")}
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={signInWithEmail}
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
             {t("Login.ButtonSignIn")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            className="text-lg"
            style={{
              fontFamily: "poppins-semibold",
              color: Colors.primary,
              textAlign: "center",
            }}
          >
            {t("Login.ButtonCreateAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
