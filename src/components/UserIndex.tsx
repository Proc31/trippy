import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Generator from "./Generator";
import InventoryScreen from "./InventoryScreen";
import Reader from "./Reader";
import EditStudents from "../components/pages/EditStudents";
import InviteStudents from "@/components/pages/InviteStudents";

export default function UserIndex() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "reader", title: "Reader", icon: "icon" },
    { key: "generator", title: "Generator", icon: "icon" },
    { key: "inventory", title: "Inventory", icon: "icon" },
    { key: "editstudents", title: "EditStudents", icon: "icon" },
    { key: "invitestudents", title: "InviteStudents", icon: "icon" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    generator: Generator,
    inventory: InventoryScreen,
    reader: Reader,
    editstudents: EditStudents,
    invitestudents: InviteStudents,
  });


  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
