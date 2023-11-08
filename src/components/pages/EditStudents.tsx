import StudentList from "../StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "../SendStudentInvites";
import React, { useEffect, useState } from "react";
import RemoveStudentBtn from "../RemoveStudentBtn";
import { onValue, ref } from "@firebase/database";
import { database } from "../../../firebase/config";

export default function EditStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const studentArr = [];
      const tripRef = await ref(database, "trips/1/students");
      onValue(tripRef, (snapshot) => {
        const data = snapshot.val();

        for (let key in data) {
          const studentsRef = ref(database, `students/${key}`);
          onValue(studentsRef, (snapshot) => {
            const studentData = snapshot.val();
            [studentData].forEach((student) => studentArr.push(student));
          });
        }
        setStudents(studentArr); // Update the state with fetched data
      });
    };
    fetchData();
  }, []);
  const [checkedItems, setCheckedItems] = useState([]);
  const [indexToRemove, setIndexes] = useState([]);
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
          Select Students To Remove
        </Text>
      }
      students={students}
      checkedItems={checkedItems}
      setCheckedItems={setCheckedItems}
    />,
    <RemoveStudentBtn
      checkedItems={checkedItems}
      students={students}
      setCheckedItems={setCheckedItems}
    />,
  ];
}
