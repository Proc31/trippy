import * as Firebase from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DB_URL,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER_ID,
  FB_APP_ID,
  FB_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const analytic = getAnalytics();
export const database = getDatabase();
export const FIREBASE_AUTH = getAuth(app);

import { ref, update } from "@firebase/database";

const db = Firebase.getDatabase();

export async function getGuardians() {
  const ref = Firebase.ref(db, "guardians");
  const data = await Firebase.get(ref);
  const guardians = data.val();
  const keys = Object.keys(guardians);
  const result = keys.map((guardian) => {
    return { [guardian]: guardians[guardian] };
  });
  return result;
}

export async function getStudents() {
  const ref = Firebase.ref(db, "students");
  const data = await Firebase.get(ref);
  const students = data.val();
  const keys = Object.keys(students);
  const result = keys.map((student) => {
    return { [student]: students[student] };
  });
  return result;
}

export async function getTrips() {
  const ref = Firebase.ref(db, "trips");
  const data = await Firebase.get(ref);
  const trips = data.val();
  const keys = Object.keys(trips);
  const result = keys.map((trip) => {
    return { [trip]: trips[trip] };
  });
  return result;
}

export async function getSingleTrip(id) {
  const ref = Firebase.ref(db, `trips/${id}`);
  const result = await Firebase.get(ref);
  return result;
}

export async function getSingleStudent(id) {
  const ref = Firebase.ref(db, `students/${id}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return { id: id, ...parsedResult };
}

export async function getSingleTeacher(id) {
  const ref = Firebase.ref(db, `teachers/${id}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return parsedResult;
}

export async function getUserRole(id) {
  const ref = Firebase.ref(db, `users/${id}`);
  const result = await Firebase.get(ref);
  return result;
}

export async function getTripStudents(id) {
  const data = await getSingleTrip(id);
  const students = data.val().students;
  const keys = Object.keys(students);
  const result = keys.map((student) => {
    return { [student]: students[student] };
  });
  return result;
}

export async function getTripInventory(id) {
  const data = await getSingleTrip(id);
  const result = data.val().inventory;
  result.splice(0, 1); //First item of array is undefined, why is this?
  return result;
}

export async function createHeadCount(id) {
  const ref = Firebase.ref(db, "headcounts");
  const data = await getTripStudents(id);
  const studentIds = data.map((student) => {
    return Object.keys(student)[0];
  });
  const students = {};
  studentIds.forEach((student) => {
    students[student] = false;
  });
  const headCount = {
    trip: id,
    students: students,
    timestamp: Date.now(),
  };
  const url = await Firebase.push(ref, headCount);
  const urlString = url.toString().match(/([^/]+)$/g);
  return urlString[0];
}

export async function setStudentPresent(student, headcount) {
  const ref = Firebase.ref(db, `headcounts/${headcount}/students`);
  const update = {
    [student]: true,
  };
  Firebase.update(ref, update);
}

export async function getHeadCountStudents(headcount) {
  const ref = Firebase.ref(db, `headcounts/${headcount}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return parsedResult.students;
}

export async function getMultipleStudents(idsArray) {
  const studentPromises = idsArray.map((id) => getSingleStudent(id));
  const students = await Promise.all(studentPromises);
  return students;
}

export async function removeStudentsFromTrip(studentId, trip) {
  const studentsRef = ref(db, `trips/${trip}/students`);
  removeTripFromStudent(studentId, trip).then(() => {
    return update(studentsRef, {
      [studentId]: null,
    });
  });
}
export async function removeTripFromStudent(studentId, trip) {
  const studentsRef = ref(db, `students/${studentId}/trips/`);
  return update(studentsRef, {
    [trip]: null,
  });
}
