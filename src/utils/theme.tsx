//Theme definition - Using default for now
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#28a745", // Green
  },
  fontFamily: "Poetsen One",
  listHeader: {
    fontFamily: "Poetsen One",
    textAlign: "center",
    fontSize: 32,
    textDecorationLine: "underline",
    color: "white",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
    backgroundColor: "#b9c9fc",
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  listText: {
    fontFamily: "Poetsen One",
    marginLeft: 8,
    fontSize: 32,
    borderStyle: "solid",

    height: "100%",
    width: "100%",
    padding: 5,
    color: "white",
  },
  // #09131B
  tripTitle: {
    fontSize: 32,
    fontFamily: "Poetsen One",
    color: "#09131B",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  tripDeleteButton: {
    flex: 1,
    backgroundColor: "#FF788E",
    height: 60,
    justifyContent: "center",
  },
  tripDesc: {
    fontSize: 20,
    marginBottom: 20,
    color: "#09131B",
    fontWeight: "bold",
  },
  buttonText: { color: "white", fontSize: 20, fontFamily: "Poetsen One" },
  tripTeacherButtons: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#6469CE",
  },
  tripCard: {
    margin: 16,
    padding: 20,
    backgroundColor: "#E4EEF6",
  },
};

export default theme;
