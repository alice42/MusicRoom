import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.green01
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  errorMessage: {
    color: colors.darkOrange,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 5
  }
});
export default styles;
