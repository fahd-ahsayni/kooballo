import React, { useState } from "react";
import { FormControl, Input, Button, VStack, Text, Box } from "native-base";
import { View, SafeAreaView, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { supabase_customer } from "../../supabase/supabase-customer";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { t } from "../../i18n";
import { useInputState } from "../../hooks";

export default function RegisterScreen() {
  const [email, handleEmailChange] = useInputState("");
  const [password, handlePasswordChange] = useInputState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const contentText = {
    p: t("Login.PasswordError"),
    e: t("Register.emailValidation"),
    ErrorMessage: t("Register.ErrorMessage"),
    confirmation: t("Register.confirmationMessage"),
    default: t("Register.defaultMessage")
  };

  const navigation = useNavigation();

  const validateForm = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError(contentText.e);
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "" || password.length < 8) {
      setPasswordError(contentText.p);
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      setLoading(true);
      setMessage("");

      try {
        const { error } = await supabase_customer.auth.signUp({
          email,
          password,
        });

        if (error) {
          handleError(error);
        } else {
          setMessage("Check your email for a confirmation link.");
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (error) => {
    setMessage(error.message);
  };

  const handleClick = () => setShow(!show);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center">
      <StatusBar backgroundColor="white" showHideTransition="fade" />
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: "poppins-bold",
            }}
            className="text-center leading-9 mb-6 pt-10"
          >
            {t("Register.title")}
          </Text>
        </View>

        <View className="mb-6">
          {!message ? (
            <View className="flex flex-row items-center justify-center py-4 rounded-lg bg-slate-100">
              <Icon name="alert-circle-outline" color="#334155" size={24} />
              <Text
                style={{ fontFamily: "poppins-semibold" }}
                className="font-semibold text-[12px] text-slate-700 ml-2"
              >
                {contentText.default}
              </Text>
            </View>
          ) : message == "Check your email for a confirmation link." ? (
            <View className="flex flex-row items-center justify-center py-4 bg-green-100 rounded-lg">
              <Icon
                name="checkmark-done-circle-outline"
                color="#15803d"
                size={24}
              />
              <Text
                style={{ fontFamily: "poppins-semibold" }}
                className="font-semibold text-[12px] text-green-700 ml-2"
              >
                {contentText.confirmation}
              </Text>
            </View>
          ) : (
            <View className="flex flex-row items-center justify-center py-4 bg-red-100 rounded-lg">
              <Icon name="alert-circle-outline" size={24} />
              <Text
                style={{ fontFamily: "poppins-semibold" }}
                className="font-semibold text-[12px] text-red-700 ml-2"
              >
                {contentText.ErrorMessage}
              </Text>
            </View>
          )}
        </View>

        <View>
          <VStack space={4}>
            <FormControl>
              <FormControl.Label>{t("Register.emailLabel")}</FormControl.Label>
              <Input
                placeholder={t("Register.inputEmailText")}
                value={email}
                className="py-2.5"
                style={{ fontFamily: "poppins-regular" }}
                keyboardType="email-address"
                onChangeText={handleEmailChange}
                borderColor={emailError ? "red" : "muted.400"}
                InputLeftElement={
                  <Button
                    size="xs"
                    rounded="none"
                    h="full"
                    className="bg-transparent -mr-2.5"
                  >
                    <Icon
                      name="mail"
                      size={18}
                      color="#64748b"
                      className="h-full"
                    />
                  </Button>
                }
              />
              {emailError ? (
                <Text
                  className="text-xs mt-2.5"
                  style={{ color: "red", fontFamily: "poppins-regular" }}
                >
                  {emailError}
                </Text>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {" "}
                {t("Register.passwordLabel")}
              </FormControl.Label>
              <Input
                placeholder={t("Register.inputPasswordText")}
                borderColor={passwordError ? "red" : "muted.400"}
                value={password}
                type={show ? "text" : "password"}
                onChangeText={handlePasswordChange}
                style={{ fontFamily: "poppins-regular" }}
                className="py-2.5"
                InputLeftElement={
                  <Button
                    size="xs"
                    rounded="none"
                    h="full"
                    className="bg-transparent -mr-2.5"
                  >
                    <Icon
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
                    <Icon
                      name={show ? "eye-outline" : "eye-off-outline"}
                      size={18}
                      color="#64748b"
                      className="h-full"
                    />
                  </Button>
                }
              />
              {passwordError ? (
                <Text
                  className="text-xs mt-2.5"
                  style={{ color: "red", fontFamily: "poppins-regular" }}
                >
                  {passwordError}
                </Text>
              ) : null}
            </FormControl>

            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-sky-500"
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
                {t("Register.buttonSignUp")}
              </Text>
            </TouchableOpacity>

            <View className="flex flex-row items-center justify-center mt-4">
              <Text
                style={{ fontFamily: "poppins-regular" }}
                className="font-semibold text-gray-800"
              >
                {t("Register.AlreadyHaveAnAccount")}
              </Text>
              <Text
                onPress={() => navigation.navigate("login")}
                className="px-2 text-base text-sky-500"
                style={{ fontFamily: "poppins-semibold" }}
              >
                {t("Register.buttonSignIn")}
              </Text>
            </View>
          </VStack>
        </View>
      </View>
    </SafeAreaView>
  );
}
