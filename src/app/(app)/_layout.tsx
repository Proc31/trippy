import * as React from 'react';
import { Redirect, Slot } from 'expo-router';
import { useSession } from '@/auth/ctx';
import Loading from '@/components/global/Loading';

export default function AppLayout() {
	const { session, isLoading } = useSession();

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <Loading />;
	}

	if (!session) {
		return <Redirect href="/sign-in" />;
	}

	// This layout can be deferred because it's not the root layout.
	return <Slot />;
}
