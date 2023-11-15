import * as React from "react";
import { Redirect, Tabs } from "expo-router";
import { useSession } from "@/auth/ctx";
import Loading from "@/components/global/Loading";
import Header from "@/components/global/Header";

export default function AppLayout() {
  const { session, isLoading, signOut } = useSession();
  

  if (isLoading) {
    return <Loading />;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  // This layout can be deferred because it's not the root layout.
  return (
    <>
      <Header  signOut={signOut} />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="SendStudentInvites" options={{ title: "Add Students" }} />
      </Tabs>
    </>
  );
}