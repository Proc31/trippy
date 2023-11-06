import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Index from './src/Index';

export default function App() {
	return (
		<NavigationContainer>
			<PaperProvider>
				<Index />
			</PaperProvider>
		</NavigationContainer>
	);
}

AppRegistry.registerComponent('trippy', () => App);
