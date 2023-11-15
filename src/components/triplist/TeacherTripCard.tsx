import React, { useState } from "react";
import {
  Card,
  Button,
  Text,
  Title,
  Subheading,
  Icon,
} from "react-native-paper";
import { Alert } from "react-native";
import TripEditForm from "./EditTripForm";
import { router } from "expo-router";
import theme from "@/utils/theme";
import themeContext from "@react-navigation/native/src/theming/ThemeContext";

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

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteTrip(tripId),
        },
      ],
      { cancelable: false },
    );
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
          mode="contained"
          style={{
            flex: 1,
            height: 60,
            justifyContent: "center",
            paddingTop: 8,
            backgroundColor: theme.colors.primary,
          }}
          onPress={() =>
            router.push({
              pathname: `/trip/(${userRole})/[tripId]/Start`,
              params: {
                tripId,
                tripTitle: tripDetails.name,
              },
            })
          }
        >
          <Icon size={30} source={"play"} />
        </Button>
        <Button
          mode="contained"
          style={theme.tripTeacherButtons}
          onPress={() =>
            router.push({
              pathname: `/trip/(${userRole})/[tripId]/Edit`,
              params: {
                tripId,
                tripTitle: tripDetails.name,
              },
            })
          }
        >
          <Icon size={30} source={"file-edit"} />
        </Button>
        <Button onPress={confirmDelete} style={theme.tripDeleteButton}>
          <Icon size={30} source={"delete"} />
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
