import * as React from 'react';
import { Text, List } from 'react-native-paper';
import { View } from 'react-native';

export default function MissingStudentList({ missingStudents }) {
	const [localList, setLocalList] = React.useState([]);

	React.useEffect(() => {
		setLocalList(missingStudents);
	});

	return (
		<View>
			{localList.map((student, index) => {
				return (
					<List.Item
						key={index}
						title="First Item"
						description="Item description"
					/>
				);
			})}
		</View>
	);
}
