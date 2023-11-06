import { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Generator from './Generator';
import Reader from './Reader';

export default function UserIndex() {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'reader', title: 'Reader', icon: 'icon' },
		{ key: 'generator', title: 'Generator', icon: 'icon' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		generator: Generator,
		reader: Reader,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}
