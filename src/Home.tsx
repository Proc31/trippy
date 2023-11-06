import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from './Contexts';

export default function Home() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<View>
			<Text>Signed in!</Text>
			<Button title="Sign out" onPress={signOut} />
		</View>
	);
}

//Page to display after the user has logged in!
