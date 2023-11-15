import React from "react";
import { Card, IconButton, Button, Text } from "react-native-paper";
import { Modal, View } from "react-native";
import { router } from "expo-router";
const AddTripCard = ({ onPress }) => {
  return (
    <View>
      <Card style={{ margin: 16 }}>
        <Card.Content style={{ alignItems: "center" }}>
          <IconButton
            icon="plus"
            size={40}
            onPress={() =>
              router.push({
                pathname: `/CreateTrip/AddTripForm`,
                params: {
                },
              })
            }
          />
        </Card.Content>
      </Card>
    </View>
  );
};
export default AddTripCard;