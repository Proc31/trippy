import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import theme from "../../utils/theme";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function StudentList({
  checkedItems,
  setCheckedItems,
  students,
  tripStudents,
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
    console.log(checkedItems)
  };
  
  return (
      <ScrollView style={theme.listContainer}>
        {students.map((student, index) => {
          const studentId = students[index].id

          let hasConsentedOrInvited = false; // this depends on whether this studentList is being rendered on invite or edit screen
          if(consentInfo) {
            hasConsentedOrInvited = consentInfo[studentId].hasOwnProperty('consented')
          }
          if(tripStudents) {
            hasConsentedOrInvited = (tripStudents.findIndex((id) => id === student.id) !== -1)
          }
          
          return (
            <View key={index + 43} style={theme.checkboxContainer}>
              <View style={theme.checkboxContent}>
                <Checkbox
                  // uncheckedColor="#2a2c41"
                  key={index + 100}
                  status={checkedItems.includes(student.id) ? "checked" : "unchecked"}
                  onPress={() => handleCheckboxChange(student.id)}
                  />
              </View>
              <Text key={index + 299} style={theme.listText}>
                {student.first_name + " " + student.surname}
              </Text>
              {hasConsentedOrInvited?             
              <MaterialIcons
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                paddingRight: 5
              }}
              name="check-circle" size={24} color="green"
              /> : null}
            </View>
          );
        })}
      </ScrollView>
  );
    }
