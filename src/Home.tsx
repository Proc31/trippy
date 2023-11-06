import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from './Contexts';
import Generator from './components/Generator';

export default function Home() {
	const { signOut } = React.useContext(AuthContext);

	return (
		<>
			<View>
				<Button title="Sign out" onPress={signOut} />
			</View>
		</>
	);
}

//Page to display after the user has logged in!
