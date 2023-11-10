import * as React from 'react';
import { List, Button, Text } from 'react-native-paper';
import { View } from 'react-native';
import { getMultipleStudents, setStudentPresent } from '@/utils/utils';

export default function MissingStudentList({
	missingStudents,
	hideModal,
	headcount,
}) {
	const [localList, setLocalList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetchStudentData();
	}, []);

	React.useEffect(() => {
		if (localList.length === 0 && isLoading === false) {
			hideModal();
		}
	}, [localList]);

	// Only to be ran once on init
	const fetchStudentData = async () => {
		const students = await getMultipleStudents(missingStudents);
		setLocalList(students);
		setIsLoading(false);
	};

	const updateLocalList = (id) => {
		const updatedStudents = localList.filter((student) => {
			return student.id !== id ? true : false;
		});
		setLocalList(updatedStudents);
	};

	const handleStudentButton = async (student) => {
		setStudentPresent(student, headcount);
		updateLocalList(student);
	};

	if (isLoading) {
		return <></>;
	} else {
		return (
			<View>
				{localList.length !== 0 ? (
					localList.map((student) => {
						return (
							<List.Item
								key={student.id}
								title={`${student.first_name} ${student.surname} `}
								left={(props) => (
									<List.Icon {...props} icon="barcode" />
								)}
								right={() => (
									<Button
										onPress={() => {
											handleStudentButton(student.id);
										}}
									>
										Mark as Present
									</Button>
								)}
							/>
						);
					})
				) : (
					<View style={{ marginBottom: 2, alignItems: 'center' }}>
						<Text variant="labelLarge">Everybody is Present!</Text>
					</View>
				)}
				<Button onPress={hideModal}>Close Window</Button>
			</View>
		);
	}
}
