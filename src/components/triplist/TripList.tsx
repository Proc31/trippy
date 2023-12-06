import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import TeacherTripCard from "./TeacherTripCard";
import AddTripCard from "./AddTripcard";
import { getTrips, getStudentsTrips, deleteTrip } from "@/utils/utils";
import GuardianTripCard from "./GuardianTripCard";
import Loading from "../global/Loading";

const TripList = ({ id, role, child }) => {
  const [userRole, setUserRole] = useState();
  const [trips, setTrips] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
    setLoading(true);

    let fetchTripsPromise;

    if (role === "student") {
      fetchTripsPromise = getStudentsTrips(id);
    } else if (role === "teacher") {
      fetchTripsPromise = getTrips();
    } else if (role === "guardian") {
      fetchTripsPromise = getStudentsTrips(child);
    }

    fetchTripsPromise
      .then((trips) => setTrips(trips))
      .finally(() => setLoading(false));
  }, [id, role, child]);

  if (isLoading) {
    return <Loading />;
  }

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
