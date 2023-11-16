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
  const [consentInfo, setConsentInfo] = useState([])
  //TODO this needs to be changed to get the trip id from the user
  const [trip, setTrip] = useState("");
  const { tripId } = useGlobalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip = await getSingleTrip(tripId);
        setTrip(trip);
        const tripStudents = await getTripStudents(tripId);

        if(tripStudents) {
          setConsentInfo(tripStudents)
        }
        const firstKeys = tripStudents.map((obj) => Object.keys(obj)[0]);
        const studentData = await getMultipleStudents(firstKeys);
        setStudents(studentData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  const [checkedItems, setCheckedItems] = useState([]);
  const [indexToRemove, setIndexes] = useState([]);
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
      setStudents={setStudents}
      checkedItems={checkedItems}
      students={students}
      setCheckedItems={setCheckedItems}
      trip={tripId}
    />,
  ];
}
