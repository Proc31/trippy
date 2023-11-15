import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	Button,
	FAB,
	Modal,
	Portal,
	Text,
	List,
	IconButton,
	TextInput,
} from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Loading from '@/components/global/Loading';
import {
	createDBMarker,
	deleteMarker,
	getSingleMarker,
	getTripMarkers,
	updateMarker,
} from '@/utils/utils';
import { useGlobalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const LATITUDE_DELTA = 0;
const LONGITUDE_DELTA = 0.01;
const CAMERA_SPEED = 3000;

const containerStyle = { backgroundColor: 'white', padding: 20 };

export default function TeacherMap() {
	const [isLoading, setIsLoading] = React.useState(true);
	// Map States
	const [region, setRegion] = React.useState(null);
	const [markers, setMarkers] = React.useState([]);
	// Model States
	const [visible, setVisible] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');

	const mapRef = React.useRef(null);

	const { tripId } = useGlobalSearchParams();

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	React.useEffect(() => {
		const initMap = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Unable to get map permissions'); // Handle this better
				return;
			}
			let location = await Location.getCurrentPositionAsync({});
			const region = {
				latitude: parseFloat(location.coords.latitude),
				longitude: parseFloat(location.coords.longitude),
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};
			setRegion(region);
		};

		initMap();
		refreshMarkers();
		setIsLoading(false);
	}, []);

	const markedMoved = async (coordinate, markerId, index) => {
		await updateMarker(tripId, markerId, coordinate);
		const newArray = markers.filter((marker) => {
			return marker.id === markerId ? false : true;
		});
		let newMarker = markers[index];
		newMarker.coordinate = coordinate;
		setMarkers(() => {
			return [...newArray, newMarker];
		});
	};

	const createNewMarker = async () => {
		const camera = await mapRef.current.getCamera();
		const marker = {
			coordinate: camera.center,
			title: title,
			description: description,
		};
		const markerId = await createDBMarker(tripId, marker);
		const newMarker = await getSingleMarker(tripId, markerId);
		setMarkers((prev) => {
			return [...prev, newMarker];
		});
	};

	const refreshMarkers = async () => {
		const markers = await getTripMarkers(tripId);
		for (const thing in markers) {
			setMarkers((prev) => {
				return [...prev, markers[thing]];
			});
		}
	};

	const removeMarker = async (markerId) => {
		await deleteMarker(tripId, markerId);
		setMarkers(() => {
			return markers.filter((marker) => {
				return marker.id === markerId ? false : true;
			});
		});
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				region={region}
				showsUserLocation
			>
				{markers.length > 0
					? markers.map((marker, index) => {
							return (
								<Marker
									draggable
									key={marker.id}
									title={marker.title}
									coordinate={marker.coordinate}
									description={marker.description}
									onDragEnd={(e) => {
										markedMoved(
											e.nativeEvent.coordinate,
											marker.id,
											index
										);
									}}
								></Marker>
							);
					  })
					: null}
			</MapView>
			<FAB
				icon="map-marker"
				style={styles.fab}
				onPress={showModal}
				mode="elevated"
				size="small"
				theme={{
					colors: {
						primaryContainer: 'white',
						onPrimaryContainer: 'green',
					},
				}}
			/>
			<Portal>
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={containerStyle}
				>
					<View>
						<TextInput
							label="Marker Title"
							value={title}
							onChangeText={setTitle}
							mode="outlined"
						/>
						<TextInput
							label="Marker Description"
							value={description}
							onChangeText={setDescription}
							mode="outlined"
						/>
						<Button onPress={createNewMarker}>
							Create New Marker
						</Button>
						<ScrollView>
							{markers.length > 0 ? (
								markers.map((marker) => {
									return (
										<List.Item
											key={marker.id}
											title={marker.title}
											description={marker.description}
											right={() => (
												<IconButton
													icon="delete"
													size={32}
													iconColor="red"
													onPress={() => {
														removeMarker(marker.id);
													}}
												/>
											)}
										></List.Item>
									);
								})
							) : (
								<Text>No markers present!</Text>
							)}
						</ScrollView>
						<Button onPress={hideModal}>Close Window</Button>
					</View>
				</Modal>
			</Portal>
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
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 100,
		zIndex: 10,
	},
});
