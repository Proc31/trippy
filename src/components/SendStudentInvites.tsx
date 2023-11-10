import { Button } from "react-native-paper";
import React from "react";
import { View } from "react-native";
import RemoveStudentBtn from "./RemoveStudentBtn";
import { addStudentsToTrip } from "../utils/utils";

export default function SendStudentInvites({
  invited,
  checkedItems,
  setCheckedItems,
  students,
}) {
  function handleSubmit() {
    const invitedStudentIds = [];

    checkedItems.forEach((studentId) => {
      students.map((student) => {
        if (student.id === studentId) {
        invitedStudentIds.push(student.id)
        };
      })
    });

    setCheckedItems([]);
    addStudentsToTrip(invitedStudentIds, "1", {name: "London Theatre 2023", inventory: {1: "wellies", 2: "compass"}});
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
        style={{ height: 42, width: "30%", marginBottom: 5 }}
        mode="contained"
        icon={"plus-thick"}
        onPress={handleSubmit}
      >
        Invite
      </Button>
    </View>
  );
}
