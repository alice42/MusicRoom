import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.green01,
    height: 200
  },
  headerContent: {
    padding: 80
  },
  textIconWrapper: {
    flexDirection: "row",
    alignSelf: "center"
  },
  location: {
    fontSize: 15,
    color: colors.white,
    paddingTop: 2
  },
  name: {
    alignSelf: "center",
    fontSize: 22,
    color: colors.white,
    fontWeight: "600"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  containerWrapper: {
    paddingTop: 40,
    flex: 1,
    display: "flex",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  networkButtonIcon: {
    color: colors.green01,
    position: "relative",
    left: 20,
    zIndex: 8
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: colors.green01
  }
});

export default styles;
