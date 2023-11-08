import * as Firebase from "firebase/database";

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
  const students = data.map((student) => {
    return Object.keys(student)[0];
  });
  const studentFormat = students.map((student) => {
    return { [student]: false };
  });
  const headCount = {
    trip: id,
    students: studentFormat,
  };
  Firebase.push(ref, headCount);
}

export async function getMultipleStudents(idsArray) {
  const studentPromises = idsArray.map((id) => getSingleStudent(id));

  const students = await Promise.all(studentPromises);

  return students;
}
