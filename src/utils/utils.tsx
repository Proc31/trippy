import * as Firebase from "firebase/database";
import { ref, update } from "@firebase/database";

//This code will be moved into a global d.ts file
type Trip = {
  school: string;
  name: string;
  description: string;
  date: number;
  cost: string;
  organiser: string;
  consent_deadline: number;
  inventory?: any;
  students?: any
}

//-------------------------------------------------

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
    return { ...students[student], id: student };
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

export async function getSingleTrip(id: string) {
  const ref = Firebase.ref(db, `trips/${id}`);
  const result = await Firebase.get(ref);
  return result;
}

export async function getSingleStudent(id: string) {
  const ref = Firebase.ref(db, `students/${id}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return { id: id, ...parsedResult };
}

export async function getSingleTeacher(id: string) {
  const ref = Firebase.ref(db, `teachers/${id}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return { id: id, ...parsedResult };
}

export async function getSingleGuardian(id: string) {
  const ref = Firebase.ref(db, `guardians/${id}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return { id: id, ...parsedResult };
}

export async function getUserRole(id: string) {
  const ref = Firebase.ref(db, `users/${id}`);
  const result = await Firebase.get(ref);
  return result.val();
}

export async function getTripStudents(id: string) {
  const data = await getSingleTrip(id);
  const students = data.val().students;
  if (students === undefined) {
    return [];
  }
  const keys = Object.keys(students);
  const result = keys.map((student) => {
    return { [student]: students[student] };
  });
  return result;
}

export async function getTripInventory(id: string) {
  const data = await getSingleTrip(id);
  const result = data.val().inventory;
  return result;
}

export async function createHeadCount(id: string) {
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

export async function setStudentPresent(studentId: string, headcountId: string) {
  const ref = Firebase.ref(db, `headcounts/${headcountId}/students`);
  const update = {
    [studentId]: true,
  };
  Firebase.update(ref, update);
}

export async function getHeadCountStudents(headcountId: string) {
  const ref = Firebase.ref(db, `headcounts/${headcountId}`);
  const result = await Firebase.get(ref);
  const parsedResult = result.val();
  return parsedResult.students;
}

export async function getMultipleStudents(idsArray: string[]) {
  const studentPromises = idsArray.map((id: string) => getSingleStudent(id));
  const students = await Promise.all(studentPromises);
  return students;
}

export async function addStudentsToTrip(studentIds: string[], tripId: string, trip: Trip) {
  const todaysDate = new Date();
  const students = studentIds.map((studentId: string) => {
    const studentsRef = Firebase.ref(
      db,
      `trips/${tripId}/students/` + studentId,
    );
    const tripsRef = Firebase.ref(
      db,
      `students/${studentId}/` + `trips/${tripId}/`,
    );
    const set = Firebase.set;
    //add student to trip
    set(studentsRef, {
      invited: Date.now(),
    });
    // add trip to student
    set(tripsRef, {
      name: trip.name,
    });
    //add inventory to student
    addInventoryToStudent(studentId, tripId, trip);
  });
}

export async function addInventoryToStudent(studentId: string, tripId: string, trip: Trip) {
  const path = `students/${studentId}/trips/${tripId}/`;
  const set = Firebase.set;
  const inventory = trip.inventory;

  for (let key in inventory) {
    const ref = Firebase.ref(db, path + `inventory/${key}/`);
    set(ref, {
      item_name: inventory[key],
      checked: false,
    });
  }
}

export async function removeStudentsFromTrip(studentId: string, tripId: string) {
  const studentsRef = ref(db, `trips/${tripId}/students`);
  removeTripFromStudent(studentId, tripId).then(() => {
    return update(studentsRef, {
      [studentId]: null,
    });
  });
}

export async function removeTripFromStudent(studentId: string, tripId: string) {
  const studentsRef = ref(db, `students/${studentId}/trips/`);
  return update(studentsRef, {
    [tripId]: null,
  });
}

export async function getUserData(id: string) {
  const userRole = await getUserRole(id);
  let user;
  switch (userRole.role) {
    case "student":
      user = await getSingleStudent(id);
      break;
    case "teacher":
      user = await getSingleTeacher(id);
      break;
    case "guardian":
      user = await getSingleGuardian(id);
      break;
    default:
      break;
  }
  return { ...user, role: userRole.role };
}

export async function postNewTrip(trip: Trip) {
  const ref = Firebase.ref(db, "trips");
  const newTripPath = Firebase.push(ref, trip);
  const teacherId = trip.organiser;
  const newTripId = newTripPath.key;
  if (newTripId) {
    addTripToTeacher(teacherId, newTripId);
  }
  return newTripId;
}

export async function amendTripDetails(tripId: string, trip: Trip) {
  const set = Firebase.set;
  const ref = Firebase.ref(db, `trips/${tripId}/`);
  set(ref, trip);
}

export async function deleteTrip(tripId: string) {
  const set = Firebase.set;
  const tripRef = Firebase.ref(db, `trips/${tripId}/`);
  //delete students-trip
  const students = await getTripStudents(tripId);
  let studentId = "";
  for (let i = 0; i < students.length; i++) {
    studentId = Object.keys(students[i])[0];
    removeTripFromStudent(studentId, tripId);
  }
  //delete teacher-trip
  const trip = await getSingleTrip(tripId);
  const teacherId = trip.val().organiser;
  removeTripFromTeacher(teacherId, tripId);
  //delete trip
  set(tripRef, null);
}

export async function addTripToTeacher(teacherId: string, tripId: string) {
  const teachersRef = ref(db, `teachers/${teacherId}/trips/`);
  return update(teachersRef, {
    [tripId]: true,
  });
}

export async function removeTripFromTeacher(teacherId: string, tripId: string) {
  const teachersRef = ref(db, `teachers/${teacherId}/trips/`);
  return update(teachersRef, {
    [tripId]: null,
  });
}

export async function setStatusToConsented(studentId: string, tripId: string) {
  const set = Firebase.set;
  const ref = Firebase.ref(db, `trips/${tripId}/students/${studentId}/`);
  update(ref, {
    consented: Date.now(),
  });
}