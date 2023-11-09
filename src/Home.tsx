import * as React from "react";
import { View, Button } from "react-native";
import { useAuth } from "../firebase/auth/AuthContext";
import TripList from "./components/TripList";

export default function Home({ navigation }) {
  const { logout } = useAuth();

  return (
    <>
      <View>
        <Button title="Sign out" onPress={logout} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title="Move to user index section"
          onPress={() => navigation.navigate("UserIndex")}
        />
        <TripList />
      </View>
    </>
  );
}

//Page to display after the user has logged in!
