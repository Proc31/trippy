import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { Image } from 'expo-image';
import theme from '../utils/theme';
import { useSession } from '@/auth/ctx';
import { router } from 'expo-router';

export default function SignIn() {
	// States for login info
	const [email, setEmail] = React.useState('d_mitchell@sambrady.co.uk');
	const [password, setPassword] = React.useState('functionforce6');
	// UI States
	const [showPassword, setShowPassword] = React.useState(false);

	const { signIn, session } = useSession();

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSignIn = () => {
		signIn(email, password);
	};

	const debugSignIn = (type) => {
		const password = 'functionforce6';
		if (type === 'teacher') {
			signIn('c_harrison@sambrady.co.uk', password);
		}
		if (type === 'student') {
			signIn('d_mitchell@sambrady.co.uk', password);
		}
		if (type === 'guardian') {
			signIn('a_rizvi2@sambrady.co.uk', password);
		}
	};

	React.useEffect(() => {
		if (session) {
			router.replace('/');
		}
	}, [session]);

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
				source={require('@/assets/trippy.png')}
				style={{
					height: '10%',
					width: '75%',
					margin: 0,
					marginBottom: 0,
				}}
				contentFit="contain"
			/>
			<Image
				source={require('@/assets/icon.png')}
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
				onPress={handleSignIn}
				style={{ width: 300, margin: 20 }}
				theme={theme}
			>
				Sign In
			</Button>
			<Button
				mode="contained"
				onPress={() => {
					debugSignIn('teacher');
				}}
				style={{ width: 300, margin: 20 }}
				theme={theme}
			>
				Teacher
			</Button>
			<Button
				mode="contained"
				onPress={() => {
					debugSignIn('student');
				}}
				style={{ width: 300, margin: 20 }}
				theme={theme}
			>
				Student
			</Button>
			<Button
				mode="contained"
				onPress={() => {
					debugSignIn('guardian');
				}}
				style={{ width: 300, margin: 20 }}
				theme={theme}
			>
				Guardian
			</Button>
		</View>
	);
}
