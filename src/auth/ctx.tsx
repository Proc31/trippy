import React from 'react';
import { useStorageState } from './useStorageState';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/utils/config';
import { Alert } from 'react-native';

const AuthContext = React.createContext<{
	signIn: (username: string, password: string) => void;
	signOut: () => void;
	session?: string | null;
	isLoading: boolean;
} | null>(null);

// This hook can be used to access the user info.
export function useSession() {
	const value = React.useContext(AuthContext);
	if (process.env.NODE_ENV !== 'production') {
		if (!value) {
			throw new Error(
				'useSession must be wrapped in a <SessionProvider />'
			);
		}
	}

	return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
	const [[isLoading, session], setSession] = useStorageState('session');

	return (
		<AuthContext.Provider
			value={{
				signIn: async (email: string, password: string) => {
					try {
						const userCredential = await signInWithEmailAndPassword(
							FIREBASE_AUTH,
							email,
							password
						);
						setSession(userCredential.user.uid);
					} catch (err) {
						Alert.alert('Login Failed', err.code); // Clean this up to give meaningful errors
					}
				},
				signOut: () => {
					setSession(null);
				},
				session,
				isLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
