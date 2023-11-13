import * as React from 'react';
import * as Brightness from 'expo-brightness';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function Generator() {
	const text = 'Test Value';

	// BRIGHTNESS DOES NOT LOWER!
	// React.useEffect(() => {
	// 	(async () => {
	// 		const { status } = await Brightness.requestPermissionsAsync();
	// 		if (status === 'granted') {
	// 			Brightness.setBrightnessAsync(1);
	// 		}
	// 	})();
	// 	return async () => {
	// 		await Brightness.restoreSystemBrightnessAsync();
	// 	};
	// }, []);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
			}}
		>
			<QRCode value={text} size={300} />
		</View>
	);
}
