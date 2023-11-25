import * as React from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import { View } from "react-native";
import InventoryScreen from "@/components/inventory/InventoryScreen";
import { router } from "expo-router";
import theme from "@/utils/theme";
import { useEffect, useState } from "react";
import { getSingleTrip } from "@/utils/utils";

const GuardianTripCard = ({
  tripId,
  handleEditTrip,
  handleDeleteTrip,
  userRole,
}) => {
  const [tripDetails, setTripDetails] = useState("");
  useEffect(() => {
    getSingleTrip(tripId).then((data) => {
      if (!data) return;

      setTripDetails(data);
    });
  }, []);

  return (
    <Card style={theme.tripCard}>
      <Card.Content>
        <Title style={theme.tripTitle}>{tripDetails.name}</Title>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 5}}>
          <Subheading >{tripDetails.location}</Subheading>
          <Subheading>{tripDetails.date}</Subheading>
        </View>

          <View style={{paddingTop: 5}}>
            <Text style={theme.tripDetails}>
              Consent by: {tripDetails.consent_deadline}
            </Text>
            <Text style={theme.tripDetails}>
              Fee: £{tripDetails.cost}
            </Text>
          </View>

        <Text
          style={theme.tripDesc}
        >
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
              pathname: `/trip/(${userRole})/[tripId]/`,
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
