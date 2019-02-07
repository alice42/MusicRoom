import { StyleSheet } from "react-native";
import { colors } from "../../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    marginBottom: 30
  },
  label: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "700",
    color: colors.white
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    color: colors.white,
    borderBottomColor: colors.white
  },
  showButton: {
    position: "absolute",
    right: 0
  },
  showButtonText: {
    color: colors.white,
    fontWeight: "700"
  },
  checkmarkWrapper: {
    position: "absolute",
    right: 0,
    bottom: 12
  }
});

export default styles;
