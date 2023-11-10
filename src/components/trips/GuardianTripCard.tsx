import React, { useState } from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import InventoryScreen from "../InventoryScreen";

const GuardianTripCard = ({
  navigation,
  tripId,
  tripDetails,
  handleEditTrip,
  handleDeleteTrip,
}) => {


  return (
    <Card style={{ margin: 16 }}>
      <Card.Content>
        <Title style={{ fontSize: 24, fontWeight: "bold" }}>
          {tripDetails.name}
        </Title>
        <Text variant="titleMedium">{tripDetails.date}</Text>
        <Subheading style={{ color: "blue" }}>
          {tripDetails.location}
        </Subheading>
        <Text variant="bodyMedium">{tripDetails.description}</Text>
      </Card.Content>
      <Card.Cover
        style={{ padding: 6 }}
        source={{ uri: "https://picsum.photos/700" }}
      />
      <Card.Actions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          style={{ marginRight: "auto", flex: 1 }}
          onPress={() => navigation.navigate("UserIndex")}
        >
          Info
        </Button>
      </Card.Actions>

    </Card>
  );
};

export default GuardianTripCard;
