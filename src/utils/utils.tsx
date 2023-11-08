import * as Firebase from 'firebase/database';

const db = Firebase.getDatabase();

export function getGuardians() {
	const ref = Firebase.ref(db, 'guardians');
	Firebase.onValue(ref, (snapshot) => {
		const data = snapshot.val();
		const keys = Object.keys(data);
		const result = keys.map((guardian) => {
			return { [guardian]: data[guardian] };
		});
		return result;
	});
}

export function getTrips() {
	const ref = Firebase.ref(db, 'trips');
	Firebase.onValue(ref, (snapshot) => {
		const data = snapshot.val();
		const keys = Object.keys(data);
		const result = keys.map((trip) => {
			return { [trip]: data[trip] };
		});
		return result;
	});
}

export function getSingleStudent(id) {
	const ref = Firebase.ref(db, `students/${id}`);
	Firebase.onValue(ref, (snapshot) => {
		const result = snapshot.val();
		return result;
	});
}

export function getSingleTeacher(id) {
	const ref = Firebase.ref(db, `teachers/${id}`);
	Firebase.onValue(ref, (snapshot) => {
		const result = snapshot.val();
		return result;
	});
}

export function getUserRole(id) {
	const ref = Firebase.ref(db, `users/${id}`);
	Firebase.onValue(ref, (snapshot) => {
		const data = snapshot.val();
		const result = data.role;
		return result;
	});
}