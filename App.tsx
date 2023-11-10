import * as React from "react";
import { useState, useEffect } from "react";
import { AppRegistry, Platform, useColorScheme } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';
import Index from './src/Index';
import SplashScreen from '@/SplashSreen';
import { AuthProvider } from 'firebase/auth/AuthContext';
import theme from '@/components/ux/Theme';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const prefix = Linking.createURL('/');

export default function App() {
	const [isReady, setIsReady] = useState(__DEV__ ? false : true);
	const [initialState, setInitialState] = useState();
	const scheme = useColorScheme();

	const linking = {
		prefixes: [prefix],
	};

	useEffect(() => {
		const restoreState = async () => {
			try {
				const initialUrl = await Linking.getInitialURL();
				if (Platform.OS !== 'web' && initialUrl == null) {
					const savedStateString = await AsyncStorage.getItem(
						PERSISTENCE_KEY
					);
					const state = savedStateString
						? JSON.parse(savedStateString)
						: undefined;

					if (state !== undefined) {
						setInitialState(state);
					}
				}
			} finally {
				setIsReady(true);
			}
		};
		if (!isReady) {
			restoreState();
		}
	}, [isReady]);

	if (!isReady) {
		return <SplashScreen />;
	}

	return (
		<AuthProvider>
			<NavigationContainer
				theme={scheme === 'dark' ? DarkTheme : theme}
				initialState={initialState}
				onStateChange={(state) =>
					AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
				}
				linking={linking}
				fallback={<SplashScreen />}
			>
				<PaperProvider>
					<Index />
				</PaperProvider>
			</NavigationContainer>
		</AuthProvider>
	);
}

AppRegistry.registerComponent("trippy", () => App);
