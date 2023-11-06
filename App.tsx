import { useState, useEffect } from 'react';
import { AppRegistry, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import * as Linking from 'expo-linking';
import Index from './src/Index';

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const prefix = Linking.createURL('/');

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const [initialState, setInitialState] = useState();

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
		return null;
	}

	return (
		<NavigationContainer
			initialState={initialState}
			onStateChange={(state) =>
				AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
			}
			linking={linking}
			fallback={<Text>Loading...</Text>}
		>
			<PaperProvider>
				<Index />
			</PaperProvider>
		</NavigationContainer>
	);
}

AppRegistry.registerComponent('trippy', () => App);
