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
    backgroundColor: "#7687bb",
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
};

export default theme;
