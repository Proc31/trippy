import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {Text, Button} from 'react-native-paper'
import { useGlobalSearchParams } from 'expo-router';
import { setStatusToConsented } from '@/utils/utils';
import { getStudentIdFromGuardian } from '@/utils/utils';
import { useSession } from "@/auth/ctx";



const GuardianConsentPage = () => {
    const { tripId } = useGlobalSearchParams();
    const { session } = useSession();
    const guardianId = JSON.parse(session).id


    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    const handleScroll = (event) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
      const isBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adjust 20 for a margin
      setIsScrolledToBottom(isBottom);
    }; 

  const termsAndConditions = `
  Trip Details:
  - Destination: Lake District, United Kingdom
  - Departure Date and Time: Monday 8th March 9.00am
  - Return Date and Time: Friday 13th March 2024 5.00pm
  
  I, the undersigned parent or legal guardian of the above-named student, hereby give my consent for my child to participate in the upcoming school trip to the Lake District. I acknowledge and understand the details of the trip, including the departure and return dates and times.
  
  **Expectations and Behavior:**
  I understand that the school expects students to adhere to the highest standards of behavior during the Lake District trip. This includes, but is not limited to:
  
  1. Respecting the authority and instructions of the school staff, chaperones, and guides.
  2. Treating fellow students, staff, and the natural environment with courtesy and respect.
  3. Participating actively in scheduled activities and educational programs.
  4. Following safety guidelines and precautions provided by the school staff.

  **Permission and Release:**
I understand and agree that:

1. The school and its staff will take necessary precautions to ensure the safety and well-being of all students during the trip.
2. In case of a medical emergency, the school staff has my permission to seek medical attention for my child.
3. I release the school, its staff, and chaperones from any liability in case of accidents, injuries, or unforeseen events during the trip.

**Terms of Consent:**
I have read and understand the details of the school trip to the Lake District, and I hereby grant my consent for my child to participate. I acknowledge the expectations for behavior.
  
  `;

  const handleAccept = () => {
    if (isScrolledToBottom) {
        getStudentIdFromGuardian(guardianId)
        .then((studentId) => {
            setStatusToConsented(studentId, tripId)
    })
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <Text style={styles.termsText}>{termsAndConditions}</Text>
      </ScrollView>
      <Button  mode="contained" onPress={handleAccept}  
      disabled={!isScrolledToBottom}
      style={isScrolledToBottom ? null : styles.disabledButton}
      >Accept</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    marginBottom:100
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
    padding:20,
    paddingTop:0,
    borderWidth: 3,
    borderColor: "black"
  },
  termsText: {
    fontSize: 16,
    lineHeight: 24,
  },
  disabledButton: {
    backgroundColor: 'lightgrey',
  },
});

export default GuardianConsentPage;
