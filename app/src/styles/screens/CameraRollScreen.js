import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.lightBlack,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 15
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  content: {
    justifyContent: "center",
    paddingTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
    marginRight: 10
  },
  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 9999
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: colors.green01
  },
  footer: {
    backgroundColor: colors.green01,
    justifyContent: "center",
    width: width,
    height: 150
  },
  textFooter: {
    textAlign: "center",
    fontSize: 30,
    color: colors.white,
    fontWeight: "300"
  }
});
export default styles;
