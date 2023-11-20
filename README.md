# Trippy 
## Overview

Trippy is an innovative school trip app designed by function force 6 to streamline the planning, organization, and communication involved in educational outings. It fosters a collaborative environment between students, teachers, and guardians, ensuring a safe and enjoyable experience for everyone involved.

Key Features:

    Trip Invitations:
        Teachers can create and send trip invitations to students, providing details about the destination, purpose, and schedule.
        Students receive notifications about upcoming trips and can view trip details within the app.

    Map Integration:
        The app includes map integration to showcase points of interest and important locations during the trip.
        Teachers can mark key spots, historical sites, and educational points on the map for students to explore.

    QR Code Scanning:
        For efficient headcounts and attendance tracking, the app features QR code scanning.
        Teachers can generate unique QR codes for each student to scan upon arrival and departure, ensuring accurate headcounts.

    Guardian Involvement:
        Guardians receive trip invitations and can view comprehensive information about the upcoming excursion.
        The app allows guardians to provide electronic consent for their child's participation in the trip.



## Installation
To Install a local copy of trippy follow the following steps
1. Clone the repository:
```
git clone https://github.com/Proc31/trippy cd trippy
```
2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root directory and add the following variables:
```
  FB_API_KEY=<Your-key>
  FB_AUTH_DOMAIN=<Your-Domain>
  FB_DB_URL=<Your-URL>
  FB_PROJECT_ID=<Your-ID>
  FB_STORAGE_BUCKET=<Your-URL>
  FB_MESSAGING_SENDER_ID=<Your-ID>
  FB_APP_ID=1:<Your-ID>
  FB_MEASUREMENT_ID=<Your-ID>
```
4. Run the application:
```
npm run start
//Scan the the QR Code
```



## Tech Stack
We used React Native, the industry standard for making apps in react, with react-native-paper for styling. Expo was used on top of React Native to allow for easy cross-platform development and publishing to mobile, desktop and web. 

On the backend Firebase was used to host the database and provide an authorisation system for secure logins which helped provide user roles. The routing was done by expo-router which uses a file base system to route users to their correct application components.



## App Demo


https://drive.google.com/file/d/1lkQValjrpJz1FaR7r5l0nCFLCkQP7kbu/view


## Function-Force-6 Links
Matthew Proctor
```
https://github.com/Proc31
```
Simon (Sam) Barnes
```
https://github.com/simongbarnes
```
Dave Greenland
```
https://github.com/CoupDeWhoop
```
Harry Robinson
```
https://github.com/Hazbob
```
Joe Gibson
```
https://github.com/skelbon
```
Jordan McIntyre
```
https://github.com/Jay-R-Mac
```




