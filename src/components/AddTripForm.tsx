import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";

const TripForm = ({ onSubmit }) => {
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [dateString, setDateString] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = () => {
    onSubmit({ tripName, location, date: new Date(dateString), description });
  };

  return (
    <React.Fragment>
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

export default TripForm;
