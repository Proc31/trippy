import { Button } from "react-native-paper";
import React from "react";
import { View } from "react-native";
import RemoveStudentBtn from "./RemoveStudentBtn";

export default function SendStudentInvites({
  invited,
  checkedItems,
  setCheckedItems,
  students,
}) {
  function handleSubmit() {
    const invitedCopy = [...invited];

    checkedItems.forEach((studentId) => {
      invitedCopy.push(students.find((student) => student.id === studentId));
    });
    setCheckedItems([]);
    console.log(invitedCopy); // this current will get an array of student objects which we can send the invites from
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
