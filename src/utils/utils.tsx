import * as Firebase from 'firebase/database';

const db = Firebase.getDatabase();


export async function getGuardians() {
	const ref = Firebase.ref(db, 'guardians');
	const data = await Firebase.get(ref);
	const guardians = data.val();
	const keys = Object.keys(guardians);
	const result = keys.map((guardian) => {
		return { [guardian]: guardians[guardian] };
	});
	return result;
}

export async function getStudents() {
	const ref = Firebase.ref(db, 'students');
	const data = await Firebase.get(ref);
	const students = data.val();
	const keys = Object.keys(students);
	const result = keys.map((student) => {
		return { [student]: students[student] };
	});
	return result;
}

export async function getTrips() {
	const ref = Firebase.ref(db, 'trips');
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
	return result;
}

export async function getSingleTeacher(id) {
	const ref = Firebase.ref(db, `teachers/${id}`);
	const result = await Firebase.get(ref);
	return result;
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
	const ref = Firebase.ref(db, 'headcounts');
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
	const headcount_id = url.toString().match(/[^/]+)$/);
	console.log(headcount_id);
	return headcount_id;
}

export async function setStudentPresent(student_id, headcount_id) {
	const ref = Firebase.ref(db, `headcounts/${headcount_id}/${student_id}`);
	// use direct add function to set bool
}

export async function getHeadCountStudents(headcount_id) {
	const ref = Firebase.ref(db, `headcounts/${headcount_id}`);
	const result = await Firebase.get(ref);
	return result.students;
}