import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Loading from '@/components/global/Loading';

const { width, height } = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map() {
	const [location, setLocation] = React.useState(null);
	const [errorMsg, setErrorMsg] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [students, setStudents] = React.useState([
		{
			name: 'Meet Up Point',
			location: {
				latitude: 53.47216811021656,
				longitude: -2.2382618858453327,
			},
		},
	]);

	React.useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}
			let location = await Location.getCurrentPositionAsync({});

			const region = {
				latitude: parseFloat(location.coords.latitude),
				longitude: parseFloat(location.coords.longitude),
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};

			setLocation(region);
			setIsLoading(false);
		})();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={location} showsUserLocation>
				{students.map((student) => {
					return (
						<Marker
							title={student.name}
							coordinate={student.location}
						></Marker>
					);
				})}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
