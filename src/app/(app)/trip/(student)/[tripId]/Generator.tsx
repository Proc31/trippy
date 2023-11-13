import { useSession } from '@/auth/ctx';
import Loading from '@/components/global/Loading';
import * as React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Brightness from 'expo-brightness';

export default function Generator() {
	const { session } = useSession();

	const [userID, setUserID] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const user = JSON.parse(session);
		setUserID(user.id);
		setIsLoading(false);
	}, []);

	React.useEffect(() => {
		(async () => {
			const { status } = await Brightness.requestPermissionsAsync();
			if (status === 'granted') {
				Brightness.setBrightnessAsync(1);
			}
		})();
		return async () => {
			await Brightness.restoreSystemBrightnessAsync();
		};
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
			}}
		>
			<QRCode value={userID} size={300} />
		</View>
	);
}
