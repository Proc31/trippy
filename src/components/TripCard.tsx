import React, { useState } from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import TripEditForm from "./EditTripForm";

const TripCard = ({ trip, handleEditTrip, handleDeleteTrip }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = (editedTrip) => {
    handleEditTrip(editedTrip);
    setIsEditing(false);
  };



  return (
    <Card style={{ margin: 16 }}>
      <Button
        icon="delete"
        onPress={() => handleDeleteTrip()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
          margin: 1,
        }}
      />
      <Card.Content>
        <Title style={{ fontSize: 24, fontWeight: "bold" }}>
          {trip.tripName}
        </Title>
        <Subheading style={{ color: "blue" }}>{trip.location}</Subheading>
        <Text variant="titleMedium">{trip.date.toLocaleDateString()}</Text>
        <Text variant="bodyMedium">{trip.description}</Text>
      </Card.Content>
      <Card.Cover
        style={{ padding: 6 }}
        source={{ uri: "https://picsum.photos/700" }}
      />
      <Card.Actions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button style={{ marginRight: "auto", flex: 1 }}>Start</Button>
        <Button
          style={{ marginLeft: "auto", flex: 1 }}
          onPress={toggleEditForm}
        >
          Edit
        </Button>
      </Card.Actions>
      {isEditing && (
        <TripEditForm
          trip={trip}
          onSubmit={handleSaveEdit}
          onCancel={toggleEditForm}
        />
      )}
    </Card>
  );
};

export default TripCard;
