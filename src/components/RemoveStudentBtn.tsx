import { Button } from "react-native-paper";
import { View } from "react-native";
import React from "react";
import { set } from "yaml/dist/schema/yaml-1.1/set";
function RemoveStudentBtn({ setCheckedItems, checkedItems, students }) {
  function handleSubmit() {
    const studentsToDelete = students.filter((student) =>
      checkedItems.includes(student.id),
    );
    console.log(studentsToDelete); //this returns an array of student objects we need to remove from the tripe object
    setCheckedItems([]);
  }
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          height: 42,
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
        mode="contained"
        icon={"close-thick"}
        onPress={handleSubmit}
      >
        Delete
      </Button>
    </View>
  );
}

export default RemoveStudentBtn;
