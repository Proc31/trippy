import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Index from './src/Index';
import * as Linking from 'expo-linking';
import { Text } from 'react-native-paper';

const prefix = Linking.createURL('/');

export default function App() {
	const linking = {
		prefixes: [prefix],
	};

	return (
		<NavigationContainer
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
