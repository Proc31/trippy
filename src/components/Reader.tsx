import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'expo-image';
import {
	createHeadCount,
	getHeadCountStudents,
	getTripStudents,
	setStudentPresent,
} from '@/utils/utils';
const crosshairs = require('../../assets/crosshair.png');

const TRIP_ID = 1; // TODO! GET AUTH CONTEXT

export default function Reader() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(true);
	const [tripStudents, setTripStudents] = useState([]);
	const [headcountId, setHeadCountId] = useState(null);
	const [missing, setMissing] = useState(0);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		getBarCodeScannerPermissions();
		const getMissing = () => {
			let count = 0;
			for (const student in tripStudents) {
				if (tripStudents[student] === false) {
					count++;
				}
			}
			setMissing(count);
		};
		getMissing();
		const students = await getHeadCountStudents(headcountId);
	}, [tripStudents]);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Barcode data: ${data}`); //TODO Send info to backend
		setStudentPresent(data, headcountId);
		setTimeout(() => setScanned(false), 2000); //Timeout duration between scans
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<>
			<View>
				<Text>Students Missing: {missing} </Text>
			</View>
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
			</View>
			<View>
				<Button
					title="Start Head Count"
					onPress={async () => {
						const response = await createHeadCount(TRIP_ID);
						setHeadCountId(response);
						setScanned(false);
					}}
				/>
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
