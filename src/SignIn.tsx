import * as React from "react";
import { Button, TextInput, View } from "react-native";
import { AuthContext } from "./Contexts";
import { FIREBASE_AUTH } from "../firebase/config";

export default function SignIn() {
	const [email, setEmail] = React.useState('d_mitchell@sambrady.co.uk');
	const [password, setPassword] = React.useState('functionforce6');
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
		</View>
	);
}
