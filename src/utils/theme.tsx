//Theme definition - Using default for now
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#28a745", // Green
  },
  fontFamily: "Poetsen One",
  // fonts: {
  //   primary: "Glacial Indifference",
  // },
  listHeader: {
    fontFamily: "Glacial Indifference", 
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 26,
    textDecorationLine: "underline",
    color: "black",


  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    // borderColor: "#28a745",
    // borderWidth: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    borderStyle: "dashed",
  },
  checkboxContent: {
    flexDirection: "row",
    alignItems: "center", 
    paddingLeft: 16, 
  },
  listText: {
    fontFamily: "Phitra Handwritten",
    marginLeft: 8,
    fontSize: 24,
    borderStyle: "solid",
    height: "100%",
    width: "100%",
    padding: 0,
    paddingLeft: 20,
  },
  // #09131B
  tripTitle: {
    fontSize: 32,
    fontFamily: "Glacial Indifference", 
    color: "#09131B",
    textAlign: "center",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#28a745",
  },
  tripDeleteButton: {
    flex: 1,
    backgroundColor: "#FF788E",
    height: 60,
    justifyContent: "center",
    paddingTop: 8,
  },
  tripDetails: {
    fontSize: 16,
  },
  tripDesc: {
    fontFamily: "Glacial Indifference", 
    fontSize: 20,
    paddingTop: 15,
    paddingBottom: 10,
    color: "black",
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" /*fontFamily: "Poetsen One"*/ },
  tripTeacherButtons: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    backgroundColor: "#6469CE",
    paddingTop: 8,
  },
  tripCard: {     
    fontFamily: "Glacial Indifference",                     
    margin: 16,
    padding: 20,
    backgroundColor: "white",
    // borderColor: "#28a745",
    // borderWidth: 4,
  },

};

export default theme;
