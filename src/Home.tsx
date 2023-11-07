import * as React from "react";
import { View, Button } from "react-native";
import { AuthContext } from "./Contexts";

export default function Home({ navigation }) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <>
      <View>
        <Button title="Sign out" onPress={signOut} />
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
      </View>
    </>
  );
}

//Page to display after the user has logged in!
