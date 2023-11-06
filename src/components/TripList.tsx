import React, { useState } from "react";
import { ScrollView } from "react-native";
import TripCard from "./TripCard";
const placeHolder = [
  {
    tripName: "Blue John Mines Adventure",
    date: new Date("2023-08-15"),
    location: "Castleton, Derbyshire, United Kingdom",
    description:
      "Embark on a fascinating journey deep into the heart of the historic Blue John Mines in Castleton, Derbyshire. Known for its stunning caverns, rare Blue John stone, and rich mining heritage, this adventure promises an exploration of natural wonders and a glimpse into the life of miners from days gone by.",
  },
  {
    tripName: "Enchanted Forest Adventure",
    date: new Date("2023-08-15"),
    location: "Mystical Grove National Park, Everwood Kingdom",
    description:
      "Embark on an unforgettable journey through the heart of the enchanted Mystical Grove National Park, nestled deep within the magical Everwood Kingdom...",
  },
  {
    tripName: "Ancient Ruins Expedition",
    date: new Date("2023-09-10"),
    location: "Lost City, Archaeological Site",
    description:
      "Uncover the mysteries of a lost civilization as you explore the ancient ruins of the fabled Lost City...",
  },
  {
    tripName: "Whale Watching Expedition",
    date: new Date("2023-10-05"),
    location: "Marine Sanctuary, Oceanic Realm",
    description:
      "Embark on a breathtaking voyage to the heart of a marine sanctuary, where you'll witness the majestic beauty of whales in their natural habitat...",
  },
];
const TripList = () => {
     const [trips, setTrips] = useState(placeHolder)
  return (
    <ScrollView>
      {trips.map((trip, index) => {
        return <TripCard key={index} trip={trip} />;
      })}
    </ScrollView>
  );
};
export default TripList;