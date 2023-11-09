import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Modal, Portal } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'expo-image';
import MissingStudentList from './MissingStudentList';
import {
	createHeadCount,
	setStudentPresent,
	getHeadCountStudents,
} from '@/utils/utils';
const crosshairs = require('../../assets/crosshair.png');

const TRIP_ID = 2; // TODO! GET AUTH CONTEXT
const SCANNER_TIMEOUT = 1000;

const containerStyle = { backgroundColor: 'white', padding: 20 };

export default function Reader() {
	// Camera control states
	const [hasPermission, setHasPermission] = React.useState(null);
	const [scanned, setScanned] = React.useState(true);
	// Missing student states
	const [missingStudents, setMissingStudents] = React.useState([]);
	const [headcount, setHeadCount] = React.useState(null);
	// Model state
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	React.useEffect(() => {
		// Function checks for camera permissions
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		getBarCodeScannerPermissions();

		fetchMissingStudents();
	}, [headcount, missingStudents]);

	// Function checks the database for missing students and updates state list
	const fetchMissingStudents = async () => {
		if (headcount) {
			const studentArray = [];
			const students = await getHeadCountStudents(headcount);
			for (const student in students) {
				if (students[student] === false) {
					studentArray.push(student);
				}
			}
			setMissingStudents(studentArray);
		}
	};

	const handleHeadCount = async () => {
		if (!headcount) {
			const headcount = await createHeadCount(TRIP_ID);
			setHeadCount(headcount);
			setScanned(false);
		} else {
			setHeadCount(null);
			setScanned(true);
		}
	};

	const handleBarCodeScanned = ({ data }) => {
		setScanned(true);
		setStudentPresent(data, headcount);
		fetchMissingStudents();
		setTimeout(() => setScanned(false), SCANNER_TIMEOUT); //Timeout duration between scans
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<>
			{headcount ? (
				<View>
					<Text>Students Missing: {missingStudents.length} </Text>
				</View>
			) : (
				<View>
					<Text>No HeadCount Running!</Text>
				</View>
			)}
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={StyleSheet.absoluteFillObject}
				/>
				<Image
					style={{
						alignSelf: 'center',
						height: 300,
						width: 300,
					}}
					source={crosshairs}
				/>
				<Portal>
					<Modal
						visible={visible}
						onDismiss={hideModal}
						contentContainerStyle={containerStyle}
					>
						<MissingStudentList missingStudents={missingStudents} />
					</Modal>
				</Portal>
			</View>
			<View>
				<Button
					style={{ margin: 10 }}
					mode="contained"
					onPress={handleHeadCount}
				>
					{headcount ? 'Stop Head Count' : 'Start Head Count'}
				</Button>
				<Button
					style={{ margin: 10 }}
					mode="contained"
					onPress={showModal}
					disabled={headcount ? false : true}
				>
					View Missing Students
				</Button>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
