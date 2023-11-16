import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import theme from "../../utils/theme";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function StudentList({
  title,
  checkedItems,
  setCheckedItems,
  students,
  consentInfo,
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
      <Text style={{ color: "black", fontSize: 18 }}>Remove</Text>
      {students.map((student, index) => {
        let hasConsented = false;
        if (consentInfo) {
          hasConsented =
            consentInfo[index][students[index].id].hasOwnProperty("consented");
        }

        return (
          <View key={index + 43} style={theme.checkboxContainer}>
            <View style={theme.checkboxContent}>
              <Checkbox
                uncheckedColor="black"
                color="#28a745"
                key={index + 100}
                status={
                  checkedItems.includes(student.id) ? "checked" : "unchecked"
                }
                onPress={() => handleCheckboxChange(student.id)}
              />
            </View>
            <Text key={index + 299} style={theme.listText}>
              {student.first_name + " " + student.surname}
            </Text>
            {hasConsented ? (
              <MaterialIcons
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  paddingRight: 5,
                }}
                name="check-circle"
                size={24}
                color="green"
              />
            ) : null}
          </View>
        );
      })}
    </ScrollView>
  );
}
