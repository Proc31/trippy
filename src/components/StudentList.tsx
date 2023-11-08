import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";

export default function StudentList({
  title,
  checkedItems,
  setCheckedItems,
  students,
}) {
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
        <View key={index + 43} style={styles.checkboxContainer}>
          <Checkbox
            key={index + 100}
            status={checkedItems.includes(student.id) ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange(student.id)}
          />
          <Text
            key={index + 299}
            style={{
              marginLeft: 8,
              fontSize: 24,
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
