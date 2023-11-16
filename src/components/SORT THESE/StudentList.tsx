import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import theme from "../../utils/theme";

export default function StudentList({
  title,
  checkedItems,
  setCheckedItems,
  students,
}) {
  const handleCheckboxChange = (id) => {
    const currentIndex = checkedItems.indexOf(id);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setCheckedItems(newCheckedItems); //this resets the checked items on the ui
  };
  return (
    <ScrollView style={theme.listContainer}>
      {title}
      {students.map((student, index) => (
        <View key={index + 43} style={theme.checkboxContainer}>
          <Checkbox
            uncheckedColor="#2a2c41"
            color="white"
            key={index + 100}
            status={checkedItems.includes(student.id) ? "checked" : "unchecked"}
            onPress={() => handleCheckboxChange(student.id)}
          />
          <Text key={index + 299} style={theme.listText}>
            {student.first_name + " " + student.surname}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
