//Theme definition - Using default for now
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: 'white',
	},
};

export default theme;
