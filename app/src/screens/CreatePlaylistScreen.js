import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  DatePickerIOS
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../constants/colors'
import InputField from '../components/input/InputField'
import RadioInput from '../components/input/RadioInput'
import RoundedButton from '../components/button/RoundedButton'
import * as userActions from '../actions/userActions'
import Privacy from '../components/playlist/Privacy'

class CreatePlaylist extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="md-close" size={30} color={colors.lightBlack} />
      </TouchableOpacity>
    ),
    headerStyle: styles.headerStyle
  })

  state = {
    privacyOption: true,
    collabOption: false,
    title: '',
    validTitle: false,
    error: null,
    chosenDate: new Date()
  }

  handleTitleChange = title => {
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (valueCheckRegex.test(title)) {
      this.setState({ validTitle: true, title })
    } else {
      this.setState({ validTitle: false, title })
    }
  }

  handleCreateEvent = () => {
    const { title, validTitle } = this.state
    if (!validTitle) {
      errorTitle = <Text style={styles.errorMessage}>Please, enter a title for your {type}</Text>
      this.setState({
        error: errorTitle
      })
    } else {
      this.setState({
        error: null
      })
      this.props.navigation.state.params.handleCreatePlaylist(title)
      this.props.navigation.goBack()
    }
  }

  render() {
    const { validTitle, error } = this.state
    return (
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>Create a playlist</Text>
          <View style={styles.content}>
            <View style={styles.inputWrapper}>
              {error}
              <InputField
                labelText={'PLAYLIST TITLE'}
                onChangeText={this.handleTitleChange}
                color={colors.green01}
              />
            </View>
            {/* <View>
              <Text style={styles.privacyHeading}>Pick a date for your playlist</Text>
              <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate} />
            </View> */}
            {/* <Privacy
              privacyOption={this.state.privacyOption}
              selectPrivacyOption={this.selectPrivacyOption}
              collabOption={this.state.collabOption}
              selectCollabOption={this.selectCollabOption}
            /> */}
          </View>
        </ScrollView>
        <View style={styles.createButton}>
          <RoundedButton
            text="Create"
            textColor={colors.white}
            textAlign="left"
            background={colors.green01}
            borderColor="transparent"
            iconPosition="left"
            disabled={!validTitle}
            icon={
              <View style={styles.buttonIcon}>
                <FontAwesomeIcon name="angle-right" color={colors.white} size={30} />
              </View>
            }
            handleOnPress={this.handleCreateEvent}
          />
        </View>
      </View>
    )
  }
}
export default connect()(CreatePlaylist)

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    paddingTop: 50
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 9999
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.lightBlack,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15
  },
  inputWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 110
  },
  buttonIcon: {
    position: 'absolute',
    right: 0,
    top: '50%',
    marginTop: -16
  },
  errorMessage: {
    color: colors.darkOrange,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5
  }
})
