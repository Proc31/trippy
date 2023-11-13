import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import theme from '@/utils/theme';

export default function Loading() {
	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<ActivityIndicator animating={true} size="large" theme={theme} />
		</View>
	);
}
