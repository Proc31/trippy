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