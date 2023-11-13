import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function StudentList({
  title,
  checkedItems,
  setCheckedItems,
  students,
}) {
  const [fontsLoaded] = useFonts({
    "Super Summer": require("../../assets/fonts/SuperSummer.ttf"),
    Handmade: require("../../assets/fonts/Handmade.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const handleCheckboxChange = (id) => {
    //this gets passed the student id
    const currentIndex = checkedItems.indexOf(id);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems); //this resets the checked items on the ui
  };
  const studentsTest = students.map((student) => {});
  return (
    <ScrollView style={styles.container}>
      {title}
      {students.map((student, index) => (
        <View
          key={index + 43}
          style={styles.checkboxContainer}
          onLayout={onLayoutRootView}
        >
          <Checkbox
            key={index + 100}
            status={checkedItems.includes(student.id) ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange(student.id)}
          />
          <Text
            key={index + 299}
            style={{
              fontFamily: "Handmade",
              marginLeft: 8,
              fontSize: 32,
              borderStyle: "solid",
              backgroundColor: "#73B5D4",
              height: "100%",
              width: "100%",
              padding: 5,
            }}
          >
            {student.first_name + " " + student.surname}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});
