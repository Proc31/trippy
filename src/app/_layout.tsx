import * as React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "../auth/ctx";
import { PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
import theme from "@/utils/theme";
import { Text, View } from "react-native";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function Root() {
  const [fontsLoaded, fontError] = useFonts({
    "Poetsen One": require("../assets/fonts/PoetsenOne-Regular.ttf"),
  });
  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SessionProvider>
      <PaperProvider theme={theme}>
        <Slot />
      </PaperProvider>
    </SessionProvider>
  );
}
