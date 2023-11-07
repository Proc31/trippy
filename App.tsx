import * as React from "react";
import { useState, useEffect } from "react";
import { AppRegistry, Platform, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { PaperProvider, Text } from "react-native-paper";
import * as Linking from "expo-linking";
import Index from "./src/Index";
import SplashScreen from "@/SplashSreen";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

const prefix = Linking.createURL("/");

//Theme definition - Using default for now
const trippyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();
  const scheme = useColorScheme();

  const linking = {
    prefixes: [prefix],
  };

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== "web" && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      theme={scheme === "dark" ? DarkTheme : trippyTheme}
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
      linking={linking}
      fallback={<SplashScreen />}
    >
      <PaperProvider>
        <Index />
      </PaperProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent("trippy", () => App);
