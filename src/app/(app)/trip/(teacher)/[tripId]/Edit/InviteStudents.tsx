import StudentList from "@/components/SORT THESE/StudentList";
import { Text, View } from "react-native";
import SendStudentInvites from "@/components/SORT THESE/SendStudentInvites";
import React, { useEffect, useState } from "react";
import { database } from "@/utils/config";
import { ref, onValue } from "@firebase/database";
import theme from "@/utils/theme";
import { getStudents } from "@/utils/utils";

export default function InviteStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const studentsArr = [];
    const fetchData = async () => {
      getStudents().then((data) => {
        setStudents(data);
      });
    };
    fetchData();
  }, []);
  const [checkedItems, setCheckedItems] = useState([]);
  const [invited, setInvited] = useState([]);
  return [
    <StudentList
      // title={<Text style={theme.listHeader}>Invite Students</Text>}
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
