import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

const styles = StyleSheet.create({
  addContainer: {
    flexDirection: "row"
  },
  view: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8,
    flexDirection: "row",
    borderRadius: 23,
    backgroundColor: colors.green01,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16
  },
  touchable: {
    marginLeft: 10
  },
  text: {
    textAlign: "center",
    color: colors.white,
    fontSize: 16,
    maxWidth: 100
  }
});
export default styles;
