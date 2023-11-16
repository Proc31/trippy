import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TeacherTripCard from "./TeacherTripCard";
import AddTripCard from "./AddTripcard";
import { getTrips, getStudentsTrips, deleteTrip } from "@/utils/utils";
import GuardianTripCard from "./GuardianTripCard";

const TripList = ({ id, role, child }) => {
  const [userRole, setUserRole] = useState();
  const [trips, setTrips] = useState([]);

  const handleEditTrip = (editedTrip) => {
    //TODO: ui is in place functionality not implemented.
    const updatedTrips = [...trips, editedTrip];
    setTrips(updatedTrips);
  };

  const handleDeleteTrip = (tripId) => {
    deleteTrip(tripId);
  };

  useEffect(() => {
    setUserRole(role);
    if (role === "student") {
      getStudentsTrips(id).then((trips) => {
        setTrips(trips);
      });
    }
    if (role === "teacher") {
      getTrips().then((trips) => {
        setTrips(trips);
      });
    }
    if (role === "guardian") {
      getStudentsTrips(child).then((trips) => {
        setTrips(trips);
      });
    }
  }, [id]);

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

        {userRole === "teacher" ? <AddTripCard /> : null}
      </ScrollView>
    </>
  );
};
export default TripList;
