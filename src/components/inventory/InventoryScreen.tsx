import React, { useState } from 'react';
import { View, Button } from 'react-native';
import InventoryCheckList from "./InventoryCheckList";
import TeacherInventoryScreen from "./TeacherInventoryScreen";

export default function InventoryScreen() {
  const [userType, setUserType] = useState('pupil');

  const toggleUserType = () => {
    setUserType((prevUserType) => (prevUserType === 'pupil' ? 'teacher' : 'pupil'));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
      {userType === 'pupil' ? <InventoryCheckList /> : <TeacherInventoryScreen />}
      <Button title={`Switch to ${userType === 'pupil' ? 'Teacher' : 'Pupil'}`} onPress={toggleUserType} />
    </View>
  );
}