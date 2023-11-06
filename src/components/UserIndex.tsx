import { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Generator from './Generator';

export default function UserIndex() {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'generator', title: 'Generator', icon: 'icon' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		generator: Generator,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}
