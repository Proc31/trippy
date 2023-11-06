import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TripList from "./components/TripList";

export default function App() {
  return (
    <View style={styles.container}>
      <TripList />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    backgroundColor: "#2196F3",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
