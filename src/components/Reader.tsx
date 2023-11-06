import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'expo-image';
const crosshairs = require('../../assets/crosshair.png');

export default function Reader() {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};
		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		alert(`Barcode data: ${data}`); //TODO Send info to backend
		setTimeout(() => setScanned(false), 2000); //Timeout duration between scans
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});
