import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useSession } from "@/auth/ctx";
import { getSingleTrip, amendTripDetails } from "@/utils/utils";
import { router, useGlobalSearchParams } from "expo-router";
import theme from "@/utils/theme";

const EditTripForm = ({ onSubmit, onCancel, onTripIdChange }) => {
  const { tripId } = useGlobalSearchParams();

  useEffect(() => {
    getSingleTrip(tripId).then((existingTrip) => {
      setTripName(existingTrip.name),
        setLocation(existingTrip.location),
        setCost(existingTrip.cost),
        setDescription(existingTrip.description);
    });
  }, []);

  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(undefined);
  const [consentDate, setConsentDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { session } = useSession();
  const id = JSON.parse(session);

  const handleSubmit = () => {
    if (tripName && location && cost && description && date) {
      const newTrip = {
        name: tripName,
        location: location,
        cost: cost,
        description: description,
        date: date.toLocaleString().split(",")[0],
        consent_deadline: consentDate.toLocaleString().split(",")[0],
        organiser: id.id,
        school: "1",
        status: "planning",
      };

      amendTripDetails(tripId, newTrip).then(() => {
        setIsSubmitting(true);
        router.push(`/`);
      });
    }
  };

  const onDismissSingle = () => {
    setOpen(false);
  };

  const onConfirmSingle = (params) => {
    setOpen(false);
    const selectedDate = params.date;
    setDate(params.date);

    const consentDate = new Date(selectedDate);
    consentDate.setMonth(consentDate.getMonth() - 1);
    setConsentDate(consentDate);
  };

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <TextInput
          mode="flat"
          label="Trip Name"
          underlineColor={theme.colors.primary}
          value={tripName}
          onChangeText={(text) => setTripName(text)}
        />
        <TextInput
          mode="flat"
          underlineColor={theme.colors.primary}
          label="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Text style={{ marginLeft: 15 }}>
          Date: {date ? date.toDateString() : "Not selected"}
        </Text>

        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          presentationStyle="fullScreen"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ width: 380 }}
            mode="flat"
            underlineColor={theme.colors.primary}
            keyboardType="number-pad"
            label="Cost"
            value={cost}
            onChangeText={(text) => setCost(text)}
          />
        </View>
        <TextInput
          mode="flat"
          label="Description"
          underlineColor={theme.colors.primary}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          onPress={() => setOpen(true)}
          uppercase={false}
          mode="outlined"
          style={{
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Pick Trip Date</Text>
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            marginTop: 10,
          }}
          disabled={
            !tripName ||
            !location ||
            !cost ||
            !description ||
            !date ||
            isSubmitting
          }
        >
          {isSubmitting ? (
            <Text style={{ color: "white", fontSize: 20 }}>Submitting...</Text>
          ) : (
            <Text style={{ color: "white", fontSize: 20 }}>Submit</Text>
          )}
        </Button>
      </View>
    </ScrollView>
  );
};

export default EditTripForm;
