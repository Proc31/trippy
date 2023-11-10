import * as React from "react";
import { Button, TextInput, Tooltip } from 'react-native-paper';
import { View } from 'react-native';
import { useAuth } from '../firebase/auth/AuthContext';
import { Image } from 'expo-image';
import theme from './components/ux/Theme';

export default function SignIn() {
	// States for login info
	const [email, setEmail] = React.useState('o_parker@sambrady.co.uk');
	const [password, setPassword] = React.useState('functionforce6');
	// UI States
	const [showPassword, setShowPassword] = React.useState(false);

	const { login } = useAuth();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<View
			style={{
				flex: 1,
				marginTop: 10,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Image
				source={require('../assets/trippy.png')}
				style={{
					height: '10%',
					width: '75%',
					margin: 0,
					marginBottom: 0,
				}}
				contentFit="contain"
			/>
			<Image
				source={require('../assets/icon.png')}
				style={{
					height: '25%',
					width: '75%',
				}}
				contentFit="contain"
			/>
			<TextInput
				label="Email"
				value={email}
				onChangeText={setEmail}
				mode="outlined"
				theme={theme}
				style={{ width: 300, margin: 5 }}
				right={
					<TextInput.Icon
						icon="close"
						onPress={() => {
							setEmail('');
							setPassword('');
						}}
					/>
				}
			/>
			<TextInput
				label="Password"
				value={password}
				onChangeText={setPassword}
				mode="outlined"
				secureTextEntry={!showPassword}
				style={{ width: 300, margin: 5 }}
				theme={theme}
				right={
					<TextInput.Icon
						icon={showPassword ? 'eye-off' : 'eye'}
						onPress={toggleShowPassword}
					/>
				}
			/>
			<Button
				mode="contained"
				onPress={() => login(email, password)}
				style={{ width: 300, margin: 20 }}
				theme={theme}
			>
				Sign In
			</Button>
		</View>
	);
}
