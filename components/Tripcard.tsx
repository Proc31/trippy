import React from "react";
import { Text } from "react-native";
import { Card, Button } from "react-native-paper";

const TripCard = ({ trip }) => {
  return (
    <Card>
      <Card.Title title={trip.tripName} subtitle={trip.location} />
      <Card.Content>
        <Text variant="titleLarge">{trip.date.toLocaleDateString()}</Text>
        <Text variant="bodyMedium">{trip.description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Actions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button style={{ marginRight: "auto", flex: 1 }}>Start</Button>
        <Button style={{ marginLeft: "auto", flex: 1 }}>Edit</Button>
      </Card.Actions>
    </Card>
  );
};

export default TripCard;
