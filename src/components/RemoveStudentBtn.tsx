import { Button } from "react-native-paper";
import { View } from "react-native";
import React from "react";
import { removeStudentsFromTrip } from "@/utils/utils";
import { getDatabase } from "firebase/database";

const database = getDatabase();

function RemoveStudentBtn({
  setCheckedItems,
  checkedItems,
  students,
  trip,
  setStudents,
}) {
  function handleSubmit() {
    const studentsToDelete = students.filter((student) =>
      checkedItems.includes(student.id),
    );
    studentsToDelete.forEach((student) => {
      console.log("hello");
      removeStudentsFromTrip(student.id, trip).then(() => {
        setStudents(
          students.filter((student) => !studentsToDelete.includes(student)),
        );
      });
    });
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
