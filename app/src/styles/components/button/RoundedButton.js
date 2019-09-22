import { StyleSheet } from 'react-native'
import { colors } from '../../../constants/colors'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    width: '100%',
    textAlign: 'center'
  }
})
export default styles
