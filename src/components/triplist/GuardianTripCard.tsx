import * as React from "react";
import { Card, Button, Text, Title, Subheading } from "react-native-paper";
import { View } from "react-native";
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

  const readableDate = tripDetails? new Date(tripDetails.date).toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  : "..."; 

const readableConsentDate = tripDetails? new Date(tripDetails.consent_deadline).toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
  : "...";


  return (
    <Card style={theme.tripCard}>
      <Card.Content>
        <Title style={theme.tripTitle}>{tripDetails.name}</Title>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 5, marginBottom:5}}>
          <Subheading style={{fontWeight: "bold", fontFamily: 'Davys Crappy Writ'}}>{tripDetails.location}</Subheading>
          <Subheading style={{fontWeight: "bold"}}>{readableDate}</Subheading>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

        <View style={{ flex: 1, backgroundColor: "#E1F1FF", borderRadius: 10, padding: 5, marginRight:10, alignItems: 'center', justifyContent: 'center'  }}>
          <Text style={theme.tripDetails}>Consent by</Text>
          <Text style={[theme.tripDetails, { fontSize: 18}]}> {readableConsentDate} </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: '#E1F1FF', borderRadius: 10, padding: 10, marginLeft:10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[theme.tripDetails, { fontSize: 18 }]}>£{tripDetails.cost}</Text>

        </View>
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
