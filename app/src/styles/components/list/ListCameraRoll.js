import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  imageGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  image: {
    width: width / 4,
    height: width / 4,
    margin: 10
  }
});
export default styles;
