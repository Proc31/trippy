import StudentList from "../StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "../SendStudentInvites";
import React, { useEffect, useState } from "react";
import { database } from "../../../firebase/config";
import { ref, onValue } from "@firebase/database";
import { snap } from "react-native-paper-dates/lib/typescript/Time/timeUtils";
import { type } from "metro/src/integration_tests/basic_bundle/TypeScript";

export default function InviteStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const studentArr = [];
      const studentsRef = ref(database, "students");
      onValue(studentsRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            studentArr.push({ id: key, ...value }); // Collate data into an array of objects
          }
        }

        setStudents(studentArr); // Update the state with fetched data
      });
    };
    fetchData();
  }, []);
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
