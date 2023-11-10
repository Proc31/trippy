import * as React from 'react';
import { List, Button, Text } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { getMultipleStudents, setStudentPresent } from '@/utils/utils';
import theme from './ux/Theme';
import Loading from './Loading';

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
		return <Loading />;
	} else {
		return (
			<View style={{ height: 400 }}>
				<Text variant="titleLarge">Missing Students</Text>
				<ScrollView>
					{localList.length !== 0 ? (
						localList.map((student) => {
							return (
								<List.Item
									key={student.id}
									title={`${student.first_name} ${student.surname} `}
									left={(props) => (
										<List.Icon
											{...props}
											icon="barcode"
											theme={theme}
										/>
									)}
									right={() => (
										<Button
											theme={theme}
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
							<Text variant="labelLarge">
								Everybody is Present!
							</Text>
						</View>
					)}
				</ScrollView>
				<Button theme={theme} onPress={hideModal}>
					Close Window
				</Button>
			</View>
		);
	}
}
