import { Button } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
import RemoveStudentBtn from './RemoveStudentBtn';
import theme from '@/utils/theme';
import { addInventoryToStudent, addStudentsToTrip, getSingleTrip } from '@/utils/utils';
import { useGlobalSearchParams } from 'expo-router';

export default function SendStudentInvites({
  invited,
  checkedItems,
  setCheckedItems,
  tripStudents,
  setTripStudents,
  students,
  setModalVisible,
}) {
	const {tripId} = useGlobalSearchParams()
  
	
	function handleSubmit() {
		const invitedStudentIds = [];

    checkedItems.forEach((studentId) => {
      students.map((student) => {
        if (student.id === studentId) {
          
          invitedStudentIds.push(student.id);
        }
      });
    });
    
		setCheckedItems([]);
    setTripStudents([...tripStudents, invitedStudentIds])
    addStudentsToTrip(invitedStudentIds, tripId);
    setModalVisible(true)

		
	}

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 90,
      }}
    >
      <Button
        style={{ height: 42, width: "30%", marginBottom: 5 }}
        textColor= {theme.buttonText.color}
        mode="contained"
        icon={"plus-thick"}
        onPress={handleSubmit}
      >
        Invite
      </Button>
    </View>
  );
}
