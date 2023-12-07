import { Text, useTheme, Surface } from "react-native-paper";
import React, { useEffect, useState } from "react";
import StudentList from "@/components/SORT THESE/StudentList";
import RemoveStudentBtn from "@/components/SORT THESE/RemoveStudentBtn";
import { useGlobalSearchParams } from "expo-router";
import {
  getMultipleStudents,
  getSingleTrip,
  getTripStudents,
} from "@/utils/utils";

import { set } from "yaml/dist/schema/yaml-1.1/set";
import theme from "@/utils/theme";

export default function EditStudents() {
  const [students, setStudents] = useState([]);
  const [consentInfo, setConsentInfo] = useState(null)
  const [checkedItems, setCheckedItems] = useState([]);
  const [indexToRemove, setIndexes] = useState([]);
  const [trip, setTrip] = useState("");
  const { tripId } = useGlobalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip = await getSingleTrip(tripId);
        setTrip(trip);
        const tripStudents = await getTripStudents(tripId);


        const firstKeys = tripStudents.map((obj) => Object.keys(obj)[0]);
        const studentData = await getMultipleStudents(firstKeys);
        setStudents(studentData);
        const consentLookUpObject = tripStudents.reduce((acc, curr) => {
          const key = Object.keys(curr)[0]; 
          acc[key] = curr[key]; 
          return acc;
        }, {});
        setConsentInfo(consentLookUpObject) 
      } 
      catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);


  return [
    <Surface style={{ backgroundColor: theme.colors.primary }}>
      <Text
        variant="headlineSmall"
        style={{
          textAlign: "justify",
          margin: 10,
          color: "#FFFFFF",
        }}
      >
        Remove students
      </Text>
    </Surface>,
    <StudentList

      title=""

      students={students}
      consentInfo={consentInfo}
      checkedItems={checkedItems}
      setCheckedItems={setCheckedItems}
    />,
    <RemoveStudentBtn
      checkedItems={checkedItems}
      students={students}
      setStudents={setStudents}
      consentInfo={consentInfo}
      setConsentInfo={setConsentInfo}
      trip={tripId}
    />,
  ];
}
