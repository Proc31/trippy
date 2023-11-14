import StudentList from "@/components/SORT THESE/StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "@/components/SORT THESE/SendStudentInvites";
import React, { useEffect, useState } from "react";
import { database } from "@/utils/config";
import { ref, onValue } from "@firebase/database";
import theme from "@/utils/theme";

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
      title={<Text style={theme.listHeader}>Invite Students</Text>}
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
