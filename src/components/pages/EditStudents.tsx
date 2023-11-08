import StudentList from "../StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "../SendStudentInvites";
import React, { useEffect, useState } from "react";
import RemoveStudentBtn from "../RemoveStudentBtn";
import { onValue, ref } from "@firebase/database";
import { database } from "../../../firebase/config";
import {
  getMultipleStudents,
  getSingleTrip,
  getTripStudents,
} from "@/utils/utils";
import { set } from "yaml/dist/schema/yaml-1.1/set";

export default function EditStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripStudents = await getTripStudents(1);
        const firstKeys = tripStudents.map((obj) => Object.keys(obj)[0]);
        const studentData = await getMultipleStudents(firstKeys);

        setStudents(studentData);
      } catch (err) {
        console.log(err);
      }
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
