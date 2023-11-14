import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StudentList from "@/components/SORT THESE/StudentList";
import RemoveStudentBtn from "@/components/SORT THESE/RemoveStudentBtn";

import {
  getMultipleStudents,
  getSingleTrip,
  getTripStudents,
} from "@/utils/utils";
import { set } from "yaml/dist/schema/yaml-1.1/set";
import theme from "@/utils/theme";

export default function EditStudents() {
  const [students, setStudents] = useState([]);
  //TODO this needs to be changed to get the trip id from the user
  const [trip, setTrip] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripStudents = await getTripStudents(trip);
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
      title={<Text style={theme.listHeader}>Remove Students</Text>}
      students={students}
      checkedItems={checkedItems}
      setCheckedItems={setCheckedItems}
    />,
    <RemoveStudentBtn
      setStudents={setStudents}
      checkedItems={checkedItems}
      students={students}
      setCheckedItems={setCheckedItems}
      trip={trip}
    />,
  ];
}

[
  {
    LBtzX1dUbZfdmWb2hn9hFJRwUWP2: {
      consent: "02/11/2022",
      invited: "01/11/2022",
      paid: "13/01/2023",
    },
  },
  { Znn0Iw9iIzZ7sFKYddqV3nhwari1: { invited: 1699548064019 } },
  { biokDYcao0QROqMOWqDuYRnUU7o2: { invited: 1699542151500 } },
  { l82w2ycQrqOgZM7Bm7prZKSGZrh1: { invited: 1699548109007 } },
  { qMKqfMksMJSK6OAZl1h004s6TLw2: { invited: 1699548232780 } },
  { rocMnnPwWLWln61rB31Z18IYc0W2: { invited: 1699545337187 } },
  { w0zNC1jlfJcVx52PYkwgzEwDoJF2: { invited: 1699545337192 } },
];
