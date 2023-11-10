import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TeacherTripCard from "./TeacherTripCard";
import AddTripCard from "./AddTripcard";
import { getTrips, getUserRole } from "@/utils/utils";
import GuardianTripCard from "./GuardianTripCard";

const TripList = ({ navigation, data }) => {
  const [userRole, setUserRole] = useState();
  const [trips, setTrips] = useState([]);

  const handleAddTrip = (newTrip) => {
    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
  };
  const handleEditTrip = (editedTrip) => {
    //TODO: ui is in place functionality not implemented.
    const updatedTrips = [...trips, editedTrip];
    setTrips(updatedTrips);
  };

  const handleDeleteTrip = () => {
    console.log("deleted");
  };

  useEffect(() => {
    setUserRole(data);
    
    getTrips().then((trips) => {
      setTrips(trips);
    });
  }, [data]);
  return (
    <ScrollView>
      {trips.map((tripObject, index) => {
        const tripId = Object.keys(tripObject)[0];
        const tripDetails = tripObject[tripId];
        if (userRole === "teacher") {
          return (
            
              <TeacherTripCard
                key={index}
                tripId={tripId}
                tripDetails={tripDetails}
                handleEditTrip={handleEditTrip}
                handleDeleteTrip={handleDeleteTrip}
                navigation={navigation}
              />
              
            
          );
        } else {
          return (
            <GuardianTripCard
              key={index}
              tripId={tripId}
              tripDetails={tripDetails}
              handleEditTrip={handleEditTrip}
              handleDeleteTrip={handleDeleteTrip}
              navigation={navigation}
            />
          );
        }
      })}
      
      <AddTripCard onPress={handleAddTrip} />
    </ScrollView>
  );
};
export default TripList;
