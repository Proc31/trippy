import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Generator from "./Generator";
import InventoryScreen from "./InventoryScreen";
import Reader from "./Reader";
import EditStudents from "../components/pages/EditStudents";
import InviteStudents from "@/components/pages/InviteStudents";
import { CommonActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function UserIndex({ userRole }) {
  userRole = "student";

  let GeneratorComponent,
    ReaderComponent,
    InventoryComponent,
    EditStudentsComponent,
    InviteStudentsComponent;

  switch (userRole) {
    case "student":
      GeneratorComponent = Generator;
      ReaderComponent = null;
      InventoryComponent = InventoryScreen;
      EditStudentsComponent = null;
      InviteStudentsComponent = null;
      break;
    case "guardian":
      GeneratorComponent = null;
      ReaderComponent = null;
      InventoryComponent = InventoryScreen;
      EditStudentsComponent = null;
      InviteStudentsComponent = null;
      break;
    case "teacher":
      GeneratorComponent = null;
      ReaderComponent = Reader;
      InventoryComponent = InventoryScreen;
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
      {InventoryComponent && (
        <Tab.Screen
          name="Inventory"
          component={InventoryComponent}
          options={{
            tabBarLabel: "Inventory",
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
