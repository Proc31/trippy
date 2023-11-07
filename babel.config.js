module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		env: {
			development: {
				plugins: [
					["module:react-native-dotenv", {
					  "envName": "APP_ENV",
					  "moduleName": "@env",
					  "path": ".env",
					  "safe": false,
					  "allowUndefined": true,
					  "verbose": false
					}]
				  ]
			},
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
	};
};
