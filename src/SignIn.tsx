import * as React from "react";
import { Button, TextInput, View } from "react-native";
import { AuthContext } from "./Contexts";
import { FIREBASE_AUTH } from "../firebase/config";
import { getGuardians } from './utils/utils';

export default function SignIn() {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const { signIn } = React.useContext(AuthContext);
	const auth = FIREBASE_AUTH;

	return (
		<View>
			<TextInput
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<Button
				title="Sign in"
				onPress={() => signIn({ email, password, auth })}
			/>
			<Button title="DB Test" onPress={getGuardians} />
		</View>
	);
}
