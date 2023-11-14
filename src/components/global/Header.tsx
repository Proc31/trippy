import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';

export default function Header({ title, signOut }) {
	return (
		<Appbar.Header>
			<Appbar.BackAction
				onPress={() => {
					router.push('/');
				}}
			/>
			<Appbar.Content title={title} />
			<Appbar.Action icon="logout" onPress={signOut} />
		</Appbar.Header>
	);
}
