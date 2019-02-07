import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    marginBottom: 25
  },
  listItem: {
    justifyContent: "space-between",
    marginTop: 2,
    flexDirection: "row"
  },
  listKey: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.green01
  },
  listValue: {
    minWidth: "20%",
    fontWeight: "500",
    fontSize: 17,
    color: colors.grey04
  }
});
export default styles;
