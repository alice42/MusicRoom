import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  containerWrapper: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    padding: 20
  },
  text: {
    fontSize: 30,
    color: colors.green01,
    fontWeight: "300"
  }
});

export default styles;
