import * as React from "react";
import { Redirect, Tabs, useGlobalSearchParams } from "expo-router";
import { useSession } from "@/auth/ctx";
import Loading from "@/components/global/Loading";
import Header from "@/components/global/Header";
import { useTheme } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLayout() {
	const { session, isLoading, signOut } = useSession();
	const theme = useTheme();

	const { tripTitle } = useGlobalSearchParams();
	if (isLoading) {
		return <Loading />;
	}
	if (!session) {
		return <Redirect href="/sign-in" />;
	}
	// This layout can be deferred because it's not the root layout.
	return (
		<>
			<Header title={tripTitle} signOut={signOut} />
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: 'absolute', //Could cause page overlap issues
						height: 70,
						margin: 10,
						borderRadius: 12,
						paddingBottom: 7,
						paddingTop: 7,
					},
					tabBarLabelStyle: {
						fontSize: 16,
					},
					tabBarAllowFontScaling: false,
					tabBarActiveTintColor: theme.colors.primary,
				}}
			>
				<Tabs.Screen
					name="EditTripForm"
					options={{
						tabBarLabel: 'Trip Details',
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<MaterialIcons
									name="card-travel"
									size={focused ? 32 : size}
									color={
										focused ? theme.colors.primary : color
									}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="InviteStudents"
					options={{
						tabBarLabel: 'Students',
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<MaterialIcons
									name="person-add"
									size={focused ? 32 : size}
									color={
										focused ? theme.colors.primary : color
									}
								/>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="TeacherInventoryScreen"
					options={{
						tabBarLabel: 'Inventory',
						tabBarIcon: ({ focused, color, size }) => {
							return (
								<MaterialIcons
									name="inventory"
									size={focused ? 32 : size}
									color={
										focused ? theme.colors.primary : color
									}
								/>
							);
						},
					}}
				/>
			</Tabs>
		</>
	);
}