import * as React from "react";
import { View } from "react-native";
import { Appbar, Surface, Text, useTheme } from "react-native-paper";
import { useSession } from "@/auth/ctx";
import TripList from "@/components/triplist/TripList";
import Loading from "@/components/global/Loading";

export default function Home() {
  const theme = useTheme();
  // User Info States
  const [user, setUser] = React.useState({});
  // UX States
  const [isLoading, setIsLoading] = React.useState(true);

  const { signOut, session } = useSession();

  React.useEffect(() => {
    const parsedSession = JSON.parse(session);
    setUser(parsedSession);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={`Welcome, ${user.first_name}`} />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar.Header>
      <Surface style={{ backgroundColor: theme.colors.primary }}>
        <Text
          variant="headlineSmall"
          style={{
            textAlign: "justify",
            margin: 10,
            color: "#FFFFFF",
          }}
        >
          Select a trip
        </Text>
      </Surface>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TripList id={user.id} role={user.role} child={user.child} />
      </View>
    </>
  );
}
