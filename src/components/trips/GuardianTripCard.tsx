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
          Start
        </Button>
        <Button
          style={{ marginLeft: "auto", flex: 1 }}
          onPress={toggleEditForm}
        >
          Inventory
        </Button>
      </Card.Actions>

      {isEditing && (
        <InventoryScreen
          trip={tripDetails}
          onSubmit={handleSaveEdit}
          onCancel={toggleEditForm}
        />
      )}
    </Card>
  );
};

export default GuardianTripCard;
