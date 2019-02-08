import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.green01,
    height: 200
  },
  headerContent: {
    padding: 50
  },
  headerEditButton: {
    alignItems: "flex-end",
    marginRight: -30
  },
  locationWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20
  },
  emailWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
    paddingTop: 15
  },
  location: {
    fontSize: 15,
    color: colors.white,
    paddingTop: 2
  },
  iconLocation: {
    color: colors.white,
    marginRight: 5
  },
  iconEmail: {
    color: colors.green01,
    marginRight: 5
  },
  email: {
    color: colors.green01
  },
  nameWrapper: {
    alignSelf: "center",
    marginTop: 10
  },
  name: {
    alignSelf: "center",
    fontSize: 22,
    color: colors.white,
    fontWeight: "600"
  },
  editAvatarButton: {
    alignSelf: "center",
    marginLeft: 80,
    marginTop: 30,
    backgroundColor: colors.green01,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 28,
    height: 28
  },
  iconEditAvatarButton: {
    color: colors.white
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  }
});

export default styles;
