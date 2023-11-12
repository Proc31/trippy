import * as React from 'react';
import { Redirect, Tabs, useGlobalSearchParams, router } from 'expo-router';
import { useSession } from '@/auth/ctx';
import Loading from '@/components/global/Loading';
import { Appbar } from 'react-native-paper';

export default function AppLayout() {
	const { session, isLoading, signOut } = useSession();
	const { tripTitle } = useGlobalSearchParams();

	const [title, setTitle] = React.useState('');

	React.useEffect(() => {
		setTitle(tripTitle);
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	if (!session) {
		return <Redirect href="/sign-in" />;
	}
	// This layout can be deferred because it's not the root layout.
	return (
		<>
			<Appbar.Header>
				<Appbar.BackAction
					onPress={() => {
						router.back();
					}}
				/>
				<Appbar.Content title={title} />
				<Appbar.Action icon="logout" onPress={signOut} />
			</Appbar.Header>
			<Tabs screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name="reader"
					options={{ title: 'Trip Headcount' }}
				/>
			</Tabs>
		</>
	);
}
