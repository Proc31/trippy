import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Generator from "./Generator";
import InventoryScreen from "./inventory/TeacherInventoryScreen";
import Reader from "./Reader";
import EditStudents from "../components/pages/EditStudents";
import InviteStudents from "@/components/pages/InviteStudents";
import { CommonActions } from "@react-navigation/native";
import InventoryChecklist from "./inventory/InventoryCheckList";
import TeacherInventoryScreen from "./inventory/TeacherInventoryScreen";
import { useState } from "react";
import { useAuth } from "firebase/auth/AuthContext";
import { getUserRole } from "@/utils/utils";
const Tab = createBottomTabNavigator();

export default function UserIndex() {
  const [userRole, setUserRole] = useState("student");
  const { user } = useAuth();
  const id = user.uid;
  React.useEffect(() => {
    getUserRole(id).then((role) => setUserRole(role.role));
    console.log(userRole);
  }, [user]);

  let GeneratorComponent,
    ReaderComponent,
    InventoryComponent,
    EditStudentsComponent,
    InviteStudentsComponent;

  switch (userRole) {
    case "student":
      GeneratorComponent = Generator;
      ReaderComponent = null;
      InventoryComponent = InventoryChecklist;
      EditStudentsComponent = null;
      InviteStudentsComponent = null;
      break;
    case "guardian":
      GeneratorComponent = null;
      ReaderComponent = null;
      InventoryComponent = InventoryChecklist;
      EditStudentsComponent = null;
      InviteStudentsComponent = null;
      break;
    case "teacher":
      GeneratorComponent = null;
      ReaderComponent = Reader;
      InventoryComponent = TeacherInventoryScreen;
      EditStudentsComponent = EditStudents;
      InviteStudentsComponent = InviteStudents;
      break;
    default:
      GeneratorComponent = null;
      ReaderComponent = null;
      InventoryComponent = null;
      EditStudentsComponent = null;
      InviteStudentsComponent = null;
      break;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({
                focused,
                color,
                size: 24,
              });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      {InventoryComponent && (
        <Tab.Screen
          name="Inventory"
          component={InventoryComponent}
          options={{
            tabBarLabel: "Inventory",
          }}
        />
      )}
      {GeneratorComponent && (
        <Tab.Screen
          name="generator"
          component={GeneratorComponent}
          options={{
            tabBarLabel: "Generator",
          }}
        />
      )}
      {ReaderComponent && (
        <Tab.Screen
          name="reader"
          component={ReaderComponent}
          options={{
            tabBarLabel: "Reader",
          }}
        />
      )}

      {EditStudentsComponent && (
        <Tab.Screen
          name="Edit Students"
          component={EditStudentsComponent}
          options={{
            tabBarLabel: "Edit Students",
          }}
        />
      )}
      {InviteStudentsComponent && (
        <Tab.Screen
          name="Invite Students"
          component={InviteStudentsComponent}
          options={{
            tabBarLabel: "Invite Students",
          }}
        />
      )}
    </Tab.Navigator>
  );
}
