import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth, AuthProvider } from "../firebase/auth/AuthContext";
import Home from "./Home";
import SignIn from "./SignIn";
import UserIndex from "./components/UserIndex";

const Stack = createNativeStackNavigator();

export default function Index() {
  const user = useAuth;

  return (
    <AuthProvider>
      <Stack.Navigator>
        {!user ? (
          // User isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
            }}
          />
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="UserIndex" component={UserIndex} />
          </>
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
}
