import * as React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Text, Modal, Portal } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import MissingStudentList from './MissingStudentList';
import Loading from './Loading';
import theme from './ux/Theme';
import {
	createHeadCount,
	setStudentPresent,
	getHeadCountStudents,
	getSingleStudent,
} from '@/utils/utils';

const TRIP_ID = 2; // TODO! GET AUTH CONTEXT
const SCANNER_TIMEOUT = 2000;
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
	//Cleans up session
	const closeSession = () => {
		hideModal();
		setHeadCount(null);
		setScanned(true);
	};
	//Handles starting and stopping a headcount
	const handleHeadCount = async () => {
		if (!headcount) {
			const headcount = await createHeadCount(TRIP_ID);
			setHeadCount(headcount);
			setScanned(false);
		} else {
			closeSession();
		}
	};
	// Checks to see if scanned item is valid
	const checkStudent = (student) => {
		return missingStudents.includes(student);
	};

	//Handles a scan event
	const handleBarCodeScanned = async ({ data }) => {
		setScanned(true);
		const valid = checkStudent(data);
		if (valid) {
			setStudentPresent(data, headcount);
			const student = await getSingleStudent(data);
			fetchMissingStudents();
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
			Alert.alert(
				'Successful Read!',
				`${student.first_name} ${student.surname} has been marked as present`,
				[{ text: 'OK', onPress: () => {} }]
			);
		} else {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
			Alert.alert(
				'Invalid Student!',
				'The student scanned is not on this trip!',
				[{ text: 'OK', onPress: () => {} }]
			);
		}
		setTimeout(() => setScanned(false), SCANNER_TIMEOUT);
	};

	// Loading Components
	if (hasPermission === null) {
		return <Loading />;
	}
	if (hasPermission === false) {
		return <Loading />;
	}

	return (
		<>
			<View style={styles.container}>
				{headcount ? (
					<View style={styles.title}>
						{missingStudents.length !== 0 ? (
							<Text variant="labelMedium">
								Students Missing: {missingStudents.length}
							</Text>
						) : (
							<Text variant="labelMedium">
								Head Count Complete!
							</Text>
						)}
					</View>
				) : (
					<View style={styles.title}>
						<Text variant="labelMedium">No Headcount Running!</Text>
					</View>
				)}
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={styles.camera}
				/>
				<Image
					style={{
						alignSelf: 'center',
						height: 300,
						width: 300,
					}}
					source={require('../../assets/crosshair.png')}
				/>
				<Portal>
					<Modal
						visible={visible}
						onDismiss={hideModal}
						contentContainerStyle={containerStyle}
						style={{ margin: 0 }}
					>
						<MissingStudentList
							headcount={headcount}
							hideModal={hideModal}
							missingStudents={missingStudents}
						/>
					</Modal>
				</Portal>
			</View>
			<View>
				<Button
					theme={theme}
					style={{ margin: 10 }}
					mode="contained"
					onPress={handleHeadCount}
				>
					{headcount ? 'Stop Head Count' : 'Start Head Count'}
				</Button>
				<Button
					theme={theme}
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
	title: {
		position: 'absolute',
		justifyContent: 'center',
		top: 10,
		left: 128,
	},
	camera: {
		position: 'absolute',
		left: 0,
		top: 40,
		right: 0,
		bottom: 0,
	},
});
