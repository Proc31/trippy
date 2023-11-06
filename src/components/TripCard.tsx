import React from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";

const TripCard = ({ trip }) => {
  return (
    <Card style={{ margin: 16 }}>
      <Card.Content>
        <Title style={{ fontSize: 24, fontWeight: "bold" }}>
          {trip.tripName}
        </Title>
        <Subheading style={{ color: "blue" }}>{trip.location}</Subheading>
        <Text variant="titleMedium">
          {trip.date.toLocaleDateString()}
        </Text>
        <Text variant="bodyMedium">
          {trip.description}
        </Text>
      </Card.Content>
      <Card.Cover style={{ padding: 6 }} source={{ uri: "https://picsum.photos/700" }} />
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
