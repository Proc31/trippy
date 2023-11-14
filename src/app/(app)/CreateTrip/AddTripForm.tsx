import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useSession } from "@/auth/ctx";
import { postNewTrip } from "@/utils/utils";
import { router } from "expo-router";

const TripForm = ({ onSubmit, onCancel, onTripIdChange,   }) => {
  const [tripName, setTripName] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(undefined);
  const [consentDate, setConsentDate] = useState(undefined)
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
        date: date.toLocaleString().split(',')[0],
        consent_deadline: consentDate.toLocaleString().split(',')[0],
        organiser: id.id,
        school: '1',
        status: 'planning',
      };
      
       postNewTrip(newTrip).then((newTripID)=>{
        setIsSubmitting(true)
        router.push(`/trip/(teacher)/${newTripID}/Edit`)
       })
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
          label="Trip Name"
          value={tripName}
          onChangeText={(text) => setTripName(text)}
        />
        <TextInput
          label="Location"
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Text>Date: {date ? date.toDateString() : "Not selected"}</Text>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick Trip Date
        </Button>
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
          <Text style={{ fontSize: 16, marginRight: 8 }}>£</Text>
          <TextInput
            keyboardType="number-pad"
            label="Cost"
            value={cost}
            onChangeText={(text) => setCost(text)}
          />
        </View>
        <TextInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={{ margin: 4 }}
          disabled={!tripName || !location || !cost || !description || !date || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default TripForm;


