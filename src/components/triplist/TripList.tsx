import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TeacherTripCard from "./TeacherTripCard";
import AddTripCard from "./AddTripcard";
import { getTrips, getUserRole } from "@/utils/utils";
import GuardianTripCard from "./GuardianTripCard";
import { deleteTrip } from "@/utils/utils";

const TripList = ({ data }) => {
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

  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
  };

  useEffect(() => {
    setUserRole(data);
    getTrips().then((trips) => {
      setTrips(trips);
    });
  }, [trips]);

  return (
    <>
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
                userRole={userRole}
                handleEditTrip={handleEditTrip}
                handleDeleteTrip={handleDeleteTrip}
              />
            );
          } else {
            return (
              <GuardianTripCard
                key={index}
                tripId={tripId}
                tripDetails={tripDetails}
                userRole={userRole}
                handleEditTrip={handleEditTrip}
                handleDeleteTrip={handleDeleteTrip}
              />
            );
          }
        })}

        {userRole === "teacher" ? (
          <AddTripCard />
        ) : null}
      </ScrollView>
    </>
  );
};
export default TripList;
