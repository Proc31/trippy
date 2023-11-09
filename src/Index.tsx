import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth, AuthProvider } from "../firebase/auth/AuthContext";
import Home from "./Home";
import SignIn from "./SignIn";
import UserIndex from "./components/UserIndex";
import SplashScreen from "./SplashSreen";
import { Alert, Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function Index() {
  const { user, isSignOut, isLoading } = useAuth();

  return (
    <AuthProvider>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : user == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: isSignOut ? "pop" : "push",
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
