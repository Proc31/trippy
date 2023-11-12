// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
	FB_API_KEY,
	FB_AUTH_DOMAIN,
	FB_DB_URL,
	FB_PROJECT_ID,
	FB_STORAGE_BUCKET,
	FB_MESSAGING_SENDER_ID,
	FB_APP_ID,
	FB_MEASUREMENT_ID,
} from '@env';

const firebaseConfig = {
	apiKey: FB_API_KEY,
	authDomain: FB_AUTH_DOMAIN,
	databaseURL: FB_DB_URL,
	projectId: FB_PROJECT_ID,
	storageBucket: FB_STORAGE_BUCKET,
	messagingSenderId: FB_MESSAGING_SENDER_ID,
	appId: FB_APP_ID,
	measurementId: FB_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase();
export const FIREBASE_AUTH = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});