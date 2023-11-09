import * as React from "react";
import { Button, TextInput, View } from "react-native";
import { useAuth } from "../firebase/auth/AuthContext";

export default function SignIn() {
  const [email, setEmail] = React.useState("spuriousmeaning@gmail.com");
  const [password, setPassword] = React.useState("myPass");

  const { login } = useAuth();

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => login(email, password)} />
    </View>
  );
}
