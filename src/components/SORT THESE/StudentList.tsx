import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import theme from "../../utils/theme";
import { MaterialIcons } from '@expo/vector-icons';

export default function StudentList({
  students,
  tripStudents,
  consentInfo,
  checkedItems,
  setCheckedItems,
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
        {students.map((student, index) => {
          const studentId = students[index].id

          let hasConsentedOrInvited = false; // consented is on path teacher => start => EditStudents => sudentList // invited is teacher => Edit => InviteStudents => Studentlist
          if(consentInfo) { // consented
            hasConsentedOrInvited = consentInfo[studentId].hasOwnProperty('consented')
          }
          if(tripStudents) { // invited
            hasConsentedOrInvited = (tripStudents.findIndex((id) => id === student.id) !== -1)
          }
          
          return (
            <View key={index + 43} style={theme.checkboxContainer}>
              <View style={theme.checkboxContent}>
                <Checkbox
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
