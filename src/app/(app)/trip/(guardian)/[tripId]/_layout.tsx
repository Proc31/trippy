import * as React from "react";
import { Redirect, Tabs, useGlobalSearchParams, router } from "expo-router";
import { useSession } from "@/auth/ctx";
import Loading from "@/components/global/Loading";
import Header from "@/components/global/Header";
import { useTheme, Text, Surface } from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppLayout() {
  const { session, isLoading, signOut } = useSession();
  const { tripTitle } = useGlobalSearchParams();
  const theme = useTheme();

  if (isLoading) {
    return <Loading />;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <>
      <Header title={tripTitle} signOut={signOut} />

      <Tabs
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarStyle: {
            position: "absolute", //Could cause page overlap issues
            height: 70,
            margin: 10,
            borderRadius: 12,
            paddingBottom: 7,
            paddingTop: 7,
          },
          tabBarLabelStyle: {
            fontSize: 16,
          },
          tabBarAllowFontScaling: false,
          tabBarActiveTintColor: theme.colors.primary,
        }}
      >
        <Tabs.Screen
          name="GuardianConsentPage"
          options={{
            tabBarLabel: "Consent Form",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="account-child"
                  size={focused ? 38 : size}
                  color={focused ? theme.colors.primary : color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="CheckList"
          options={{
            tabBarLabel: "Inventory",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialIcons
                  name="inventory"
                  size={focused ? 32 : size}
                  color={focused ? theme.colors.primary : color}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}
