import * as React from 'react';
import { View } from 'react-native';
import {
	getSingleGuardian,
	getSingleStudent,
	getSingleTeacher,
	getUserRole,
} from '../../utils/utils';
import { Appbar } from 'react-native-paper';
import { useSession } from '@/auth/ctx';
import TripList from '@/components/triplist/TripList';
import Loading from '@/components/global/Loading';

export default function Home() {
	// User Info States
	const [userRole, setUserRole] = React.useState('');
	const [userInfo, setUserInfo] = React.useState('');
	// UX States
	const [isLoading, setIsLoading] = React.useState(true);

	const { signOut, session } = useSession();

	React.useEffect(() => {
		getUserRole(session).then((role) => {
			setUserRole(role.role);
		});
		switch (userRole) {
			case 'student':
				getSingleStudent(session).then((student) => {
					setUserInfo(student.first_name);
				});
				break;
			case 'teacher':
				getSingleTeacher(session).then((teacher) => {
					setUserInfo(teacher.first_name);
				});
				break;
			case 'guardian':
				getSingleGuardian(session).then((guardian) => {
					setUserInfo(guardian.first_name);
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
				<Appbar.Action icon="logout" onPress={signOut} />
			</Appbar.Header>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<TripList data={userRole} />
			</View>
		</>
	);
}

//
