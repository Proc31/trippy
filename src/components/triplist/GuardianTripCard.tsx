import * as React from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import InventoryScreen from "@/components/inventory/InventoryScreen";
import { router } from "expo-router";
import theme from "@/utils/theme";

const GuardianTripCard = ({
  tripId,
  tripDetails,
  handleEditTrip,
  handleDeleteTrip,
  userRole,
}) => {
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
          style={{
            flex: 1,
            height: 60,
            justifyContent: "center",
            backgroundColor: theme.colors.primary,
          }}
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
          <Text style={theme.buttonText}>Info</Text>
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default GuardianTripCard;
