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
import EditableInput from '../components/input/EditableInput'
import * as eventsActions from '../actions/eventsActions'
import Privacy from '../components/playlist/Privacy'

class EditEvent extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="md-close" size={30} color={colors.lightBlack} />
      </TouchableOpacity>
    ),
    headerStyle: styles.headerStyle
  })

  state = {
    privacyOption: this.props.event[0].privacy === 'public' ? true : false,
    error: null
  }
  componentWillMount() {
    const { privacy } = this.props.event[0]
    this.setState({ privacy: privacy === 'public' })
  }

  selectPrivacyOption = privacyOption => {
    this.setState({ privacyOption: !privacyOption })
  }
  selectCollabOption = collabOption => {
    this.setState({ collabOption: !collabOption })
  }

  handleNameEdit = name => {
    const { id } = this.props.event[0]
    this.props.eventsActions.updateEventRequest(id, 'name', name)
  }

  handlePrivacy = privacyValue => {
    this.setState({ privacyOption: !privacyValue })
    const { id } = this.props.event[0]
    const privacy = this.state.privacyOption ? 'private' : 'public'
    this.props.eventsActions.updateEventRequest(id, 'privacy', privacy)
  }

  render() {
    const { error } = this.state
    const { name, id, privacy } = this.props.event[0]
    return this.props.event ? (
      <View style={styles.wrapper}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>Edit an event</Text>
          <View style={styles.content}>
            <View style={styles.inputWrapper}>
              {error}
              <Text>{id}</Text>
              <Text style={styles.title}>EVENT TITLE</Text>
              <EditableInput
                defaultValue={name}
                onChangeText={this.handleNameEdit}
                size={12}
                type={'name'}
                style={styles.userInfosValue}
              />
            </View>
            <Privacy
              privacyOption={this.state.privacyOption}
              selectPrivacyOption={this.handlePrivacy}
              //   collabOption={this.state.collabOption}
              //   selectCollabOption={this.selectCollabOption}
            />
          </View>
        </ScrollView>
      </View>
    ) : null
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { events } = state
  const id = props.navigation.state.params.event
  return {
    event: events.list.filter(event => {
      if (event.id === id) {
        return event
      }
    })
  }
}
export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(EditEvent)

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
  userInfosValue: {
    color: colors.green01,
    maxWidth: 200,
    fontSize: 16
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
  title: {
    color: colors.green01,
    fontWeight: '800',
    marginBottom: 20
  },
  errorMessage: {
    color: colors.darkOrange,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5
  }
})
