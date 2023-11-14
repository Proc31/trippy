import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useSession } from "@/auth/ctx";
import { postNewTrip } from "@/utils/utils";

const TripForm = ({ onSubmit, onCancel }) => {
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSession();
  const id = JSON.parse(session);

  
  const handleSubmit = () => {
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);

    const newTrip = {
      name: tripName,
      location: location,
      cost: cost,
      description: description,
      date: date.toLocaleString().split(',')[0],
      organiser: id.id,
      school: '1',
      status: 'planning'
    };
    console.log(newTrip)

    postNewTrip(newTrip)
    .then(() => {
      // Handle success, optionally call onSubmit here
    })
    .catch((error) => {
      console.error("Error submitting trip:", error);
      
    })
    .finally(() => {
      setIsSubmitting(false);
    });

    
  };
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  return (
    <View>
      <TextInput
        label="Trip Name"
        value={tripName}
        onChangeText={(text) => setTripName(text)}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <Text>Date</Text>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick Trip Date
      </Button>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        presentationStyle="fullScreen"
      />
      <TextInput
        keyboardType="number-pad"
        label="Cost"
        value={cost}
        onChangeText={(text) => setCost(text)}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{ margin: 4 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </View>
  );
};
export default TripForm;