import * as React from 'react';
import { Button, TextInput, View } from 'react-native';
import { AuthContext } from './Contexts';
import { useTheme } from '@react-navigation/native';

export default function SignIn() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const theme = useTheme();
	const { signIn } = React.useContext(AuthContext);

	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<TextInput
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title="Sign in"
				onPress={() => signIn({ username, password })}
			/>
		</View>
	);
}
