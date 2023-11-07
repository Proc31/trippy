import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./Contexts";
import Home from "./Home";
import SignIn from "./SignIn";
import SplashScreen from "./SplashSreen";
import UserIndex from "./components/UserIndex";

import { signInWithEmailAndPassword } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function Index() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ email, password, auth }) => {
        try {
          const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          dispatch({ type: "SIGN_IN", token: response });
        } catch (error: any) {
          console.log(error);
          alert("Sign in failed:" + error.message);
        }

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : state.userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignout ? "pop" : "push",
            }}
          />
        ) : (
          // User is signed in
          <>
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="UserIndex" component={UserIndex} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
