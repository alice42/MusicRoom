import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  containerWrapper: {
    paddingTop: 80,
    flex: 1,
    marginTop: 30,
    padding: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.green01
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04
  }
});

export default styles;
