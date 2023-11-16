import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import theme from "@/utils/theme";

const TripEditForm = ({ onSubmit, trip }) => {
  const [tripName, setTripName] = useState(trip.tripName);
  const [location, setLocation] = useState(trip.location);
  const [dateString, setDateString] = useState(trip.editDate);
  const [description, setDescription] = useState(trip.description);

  const handleSubmit = () => {
    onSubmit({ tripName, location, date: new Date(dateString), description });
  };

  return (
    <React.Fragment>
      <TextInput
        mode="flat"
        underlineColor={theme.colors.primary}
        label="Trip Name"
        value={tripName}
        onChangeText={(text) => setTripName(text)}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <TextInput
        label="Date"
        value={dateString}
        onChangeText={(text) => setDateString(text)}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
    </React.Fragment>
  );
};

export default TripEditForm;
