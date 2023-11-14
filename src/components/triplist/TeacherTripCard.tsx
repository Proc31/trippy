import React, { useState } from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import TripEditForm from "./EditTripForm";
import { router } from "expo-router";
import theme from "@/utils/theme";

const TeacherTripCard = ({
  tripId,
  tripDetails,
  handleEditTrip,
  handleDeleteTrip,
  userRole,
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
    <Card style={theme.tripCard}>
      <Card.Content>
        <Title style={theme.tripTitle}>{tripDetails.name}</Title>
        <Text variant="titleMedium">{tripDetails.date}</Text>
        <Subheading style={{ color: "blue" }}>
          {tripDetails.location}
        </Subheading>
        <Text variant="bodyMedium" style={theme.tripDesc}>
          {tripDetails.description}
        </Text>
      </Card.Content>
      <Card.Cover
        style={{ padding: 6 }}
        source={{ uri: "https://picsum.photos/700" }}
      />
      <Card.Actions
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          icon="play"
          mode="contained"
          style={theme.tripTeacherButtons}
          onPress={() =>
            router.push({
              pathname: `/trip/(${userRole})/[tripId]`,
              params: {
                tripId,
                tripTitle: tripDetails.name,
              },
            })
          }
        >
          <Text style={{ fontFamily: "Poetsen One", color: "white" }}>
            Start
          </Text>
        </Button>
        <Button
          icon="clipboard-edit"
          mode="contained"
          style={theme.tripTeacherButtons}
          onPress={toggleEditForm}
        >
          <Text style={{ fontFamily: "Poetsen One", color: "white" }}>
            Edit
          </Text>
        </Button>
        <Button
          icon="delete"
          mode="contained"
          onPress={() => handleDeleteTrip(tripId)}
          style={theme.tripDeleteButton}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poetsen One",
              padding: 0,
              fontSize: 16,
            }}
          >
            Delete
          </Text>
        </Button>
      </Card.Actions>

      {isEditing && (
        <TripEditForm
          trip={tripDetails} // Pass tripDetails instead of trip
          onSubmit={handleSaveEdit}
          onCancel={toggleEditForm}
        />
      )}
    </Card>
  );
};

export default TeacherTripCard;
