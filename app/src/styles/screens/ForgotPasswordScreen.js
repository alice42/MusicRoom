import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.green01
  },
  forgotWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  forgotPasswordHeading: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300"
  },
  forgotPasswordSubheading: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60
  },
  errorMessage: {
    color: colors.darkOrange,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 5
  }
});
export default styles;
