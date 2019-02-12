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
    display: "flex",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04
  }
});

export default styles;
