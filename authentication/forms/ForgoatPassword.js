import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Input} from "native-base";
import { supabase_customer } from "../../supabase/supabase-customer";
import Colors from "../../constants/Colors";
import { Button } from "react-native";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword() {
    const { error } = await supabase_customer.auth.resetPasswordForEmail(email);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for a password reset link");
    }
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Button title="Reset password" onPress={handleResetPassword} />
      {message && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});

export default ForgotPasswordScreen;
