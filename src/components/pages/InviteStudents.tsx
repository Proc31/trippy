import StudentList from "../StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "../SendStudentInvites";
import React, { useState } from "react";

export default function InviteStudents() {
  const students = [
    { id: 1, studentName: "Harry Robinson" },
    { id: 2, studentName: "Emma Johnson" },
    { id: 3, studentName: "Oliver Williams" },
    { id: 4, studentName: "Ava Brown" },
    { id: 5, studentName: "Jack Jones" },
    { id: 6, studentName: "Sophia Garcia" },
    { id: 7, studentName: "William Martinez" },
    { id: 8, studentName: "Isabella Miller" },
    { id: 9, studentName: "Ethan Davis" },
    { id: 10, studentName: "Mia Rodriguez" },
    { id: 12124, studentName: "William Martinez" },
    { id: 124112415, studentName: "Isabella Miller" },
    { id: 125121231312315, studentName: "Ethan Davis" },
    { id: 105555555, studentName: "Mia Rodriguez" },
  ];
  const [checkedItems, setCheckedItems] = useState([]);
  const [invited, setInvited] = useState([]);
  return [
    <StudentList
      title={
        <Text
          style={{
            textAlign: "center",
            fontSize: 24,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          Select Students To Invite
        </Text>
      }
      students={students}
      checkedItems={checkedItems}
      setCheckedItems={setCheckedItems}
    />,
    <SendStudentInvites
      checkedItems={checkedItems}
      invited={invited}
      students={students}
      setCheckedItems={setCheckedItems}
    />,
  ];
}
