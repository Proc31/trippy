import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Generator from './Generator';
import InventoryScreen from './InventoryScreen';
import Reader from './Reader';
import EditStudents from '../components/pages/EditStudents';
import InviteStudents from '@/components/pages/InviteStudents';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function UserIndex() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				unmountOnBlur: true,
			}}
			tabBar={({ navigation, state, descriptors, insets }) => (
				<BottomNavigation.Bar
					navigationState={state}
					safeAreaInsets={insets}
					onTabPress={({ route, preventDefault }) => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (event.defaultPrevented) {
							preventDefault();
						} else {
							navigation.dispatch({
								...CommonActions.navigate(
									route.name,
									route.params
								),
								target: state.key,
							});
						}
					}}
					renderIcon={({ route, focused, color }) => {
						const { options } = descriptors[route.key];
						if (options.tabBarIcon) {
							return options.tabBarIcon({
								focused,
								color,
								size: 24,
							});
						}

						return null;
					}}
					getLabelText={({ route }) => {
						const { options } = descriptors[route.key];
						const label =
							options.tabBarLabel !== undefined
								? options.tabBarLabel
								: options.title !== undefined
								? options.title
								: route.title;

						return label;
					}}
				/>
			)}
		>
			<Tab.Screen
				name="generator"
				component={Generator}
				options={{
					tabBarLabel: 'Generator',
				}}
			/>
			<Tab.Screen
				name="reader"
				component={Reader}
				options={{
					tabBarLabel: 'Reader',
				}}
			/>
			<Tab.Screen
				name="Inventory"
				component={InventoryScreen}
				options={{
					tabBarLabel: 'Inventory',
				}}
			/>
			<Tab.Screen
				name="Edit Students"
				component={EditStudents}
				options={{
					tabBarLabel: 'Edit Students',
				}}
			/>
			<Tab.Screen
				name="Invite Students"
				component={InviteStudents}
				options={{
					tabBarLabel: 'Invite Students',
				}}
			/>
		</Tab.Navigator>
	);
}
