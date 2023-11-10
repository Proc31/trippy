import * as React  from "react";
import { View, Button } from "react-native";
import { useState } from "react";
import { useAuth } from "../firebase/auth/AuthContext";
import TripList from './components/trips/TripList';
import { getSingleStudent, getSingleTeacher, getUserRole } from './utils/utils';
import { Appbar } from 'react-native-paper';
import Loading from './components/Loading';
import DropDown from 'react-native-paper-dropdown';

export default function Home({ navigation }) {
	// User Info States
	const [userRole, setUserRole] = useState('');
	const [userInfo, setUserInfo] = useState('');
	// UX States
	const [isLoading, setIsLoading] = useState(true);

	const { logout, user } = useAuth();

	React.useEffect(() => {
		const id = user.uid;
		getUserRole(id).then((role) => {
			setUserRole(role.role);
		});
		switch (userRole) {
			case 'student':
				getSingleStudent(id).then((student) => {
					setUserInfo(student.first_name);
				});
				break;
			case 'teacher':
				getSingleTeacher(id).then((teacher) => {
					setUserInfo(teacher);
				});
				break;
			default:
				break;
		}
		setIsLoading(false);
	}, [userRole]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Appbar.Header>
				<Appbar.Content title={`Welcome, ${userInfo}`} />
				<Appbar.Action icon="logout" onPress={logout} />
			</Appbar.Header>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<TripList data={userRole} navigation={navigation} />
			</View>
		</>
	);
}

//Page to display after the user has logged in!
