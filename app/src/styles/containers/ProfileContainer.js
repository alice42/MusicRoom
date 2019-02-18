import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const styles = StyleSheet.create({
  //Container
  wrapper: {
    flex: 1
  },
  //Header
  headerProfile: {
    backgroundColor: colors.green01,
    height: 150
  },
  headerProfileContent: {
    padding: 50
  },
  headerProfileEditButton: {
    alignItems: "flex-end",
    marginRight: -30
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
    marginTop: 2,
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
    marginTop: 80
  },
  //ProfileContent
  containerWrapper: {
    flex: 1,
    display: "flex",
    alignContent: "center"
  },
  contentProfileText: {
    marginLeft: 20,
    fontSize: 30,
    color: colors.green01,
    fontWeight: "300"
  },
  contentProfileIcon: {
    color: colors.white,
    left: 20,
    zIndex: 8
  },
  contentProfileTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contentProfileWrapper: {
    padding: 20
  },
  //UserInfos
  userInfosWrapper: {
    display: "flex"
  },
  userInfosLineWrapper: {
    flexDirection: "row"
  },
  userInfosKey: {
    minWidth: "35%",
    fontSize: 17,
    fontWeight: "600",
    color: colors.green01
  },
  userInfosValue: {
    maxWidth: 200,
    fontWeight: "500",
    fontSize: 17
  },
  //Modal
  modal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100
  },
  modalContent: {
    backgroundColor: colors.white,
    width: 300,
    height: 180,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  modalText: {
    textAlign: "center"
  },
  modalPicker: {
    marginTop: -30
  },
  modalValidationButton: {
    backgroundColor: colors.green01,
    width: 300,
    height: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  privacyIcon: {
    color: colors.black,
    marginRight: 15,
    marginTop: 10
  },
  //Tags
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20
  },
  tagsTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  tagsText: {
    marginLeft: 20,
    fontSize: 30,
    color: colors.green01,
    fontWeight: "300"
  },
  tagsIcon: {
    color: colors.black,
    marginRight: 15,
    marginTop: 10
  }
});

export default styles;
