//Theme definition - Using default for now
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#28a745', // Green
	},
};

export default theme;
