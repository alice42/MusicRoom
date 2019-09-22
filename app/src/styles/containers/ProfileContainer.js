import { StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'

const styles = StyleSheet.create({
  //Header
  headerProfile: {
    backgroundColor: colors.green01,
    height: 120
  },
  headerProfileContent: {
    padding: 50
  },
  headerProfileEditButton: {
    alignItems: 'flex-end',
    marginRight: -30
  },
  editAvatarButton: {
    alignSelf: 'center',
    marginLeft: 80,
    marginTop: 15,
    backgroundColor: colors.green01,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 50
  },
  //ProfileContent
  containerWrapper: {
    display: 'flex',
    alignContent: 'center'
  },
  contentProfileText: {
    marginLeft: 20,
    fontSize: 30,
    marginBottom: -5,
    color: colors.green01,
    fontWeight: '300'
  },
  contentProfileIcon: {
    color: colors.white,
    left: 20,
    zIndex: 8
  },
  contentProfileTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentProfileWrapper: {
    padding: 20
  },
  //UserInfos
  userInfosWrapper: {
    display: 'flex'
  },
  userInfosLineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInfosKey: {
    minWidth: '20%',
    fontSize: 17,
    fontWeight: '600',
    color: colors.green01
  },
  userInfosValue: {
    maxWidth: 200,
    fontWeight: '500',
    fontSize: 17
  },
  //Modal
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: colors.white,
    width: 300,
    height: 210,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  modalTitle: {
    backgroundColor: colors.green01,
    width: 300,
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8,
    marginBottom: 15,
    position: 'absolute'
  },
  modalText: {
    color: colors.green02,
    fontSize: 26,
    fontWeight: '800'
  },
  modalSubtext: {
    color: colors.gray01,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10
  },
  modalPicker: {
    position: 'relative',
    marginTop: 30
  },
  modalValidationButton: {
    backgroundColor: colors.green01,
    width: 300,
    height: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalValidationButton1: {
    backgroundColor: colors.green01,
    width: 300,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: colors.green02,
    justifyContent: 'center',
    alignItems: 'center'
  },
  privacyIcon: {
    color: colors.black,
    marginRight: 20,
    marginTop: 10
  },
  privacyIconUsersInfo: {
    color: colors.black,
    marginLeft: 20
  },
  //Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20
  },
  tagsScrollView: {
    height: 180,
    marginBottom: 5
  },
  tagsTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tagsText: {
    marginLeft: 20,
    fontSize: 30,
    color: colors.green01,
    fontWeight: '300'
  },
  tagsIcon: {
    color: colors.black,
    marginRight: 15,
    marginTop: 10
  },
  //error
  errorMessage: {
    marginTop: 5,
    color: colors.darkOrange,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center'
  }
})

export default styles
