import * as React from 'react';
import { Slot } from 'expo-router';
import { SessionProvider } from '../auth/ctx';
import { PaperProvider } from 'react-native-paper';
import { LogBox } from 'react-native';
import theme from '@/utils/theme';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function Root() {
	// Set up the auth context and render our layout inside of it.
	return (
		<SessionProvider>
			<PaperProvider theme={theme}>
				<Slot />
			</PaperProvider>
		</SessionProvider>
	);
}
