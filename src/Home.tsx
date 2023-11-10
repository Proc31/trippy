import * as React  from "react";
import { View, Button } from "react-native";
import { useState } from "react";
import { useAuth } from "../firebase/auth/AuthContext";
import TripList from './components/trips/TripList';
import { getUserRole } from "./utils/utils";
export default function Home({ navigation }) {
  const { logout } = useAuth();
  const [userRole, setUserRole] = useState()

  const {user} = useAuth()
  const id = user.uid
  getUserRole(id).then((role)=>
    setUserRole(role.role)

  )

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
        <TripList data={userRole} navigation={navigation}/>
      </View>
    </>
  );
}

//Page to display after the user has logged in!
