import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../constants/colors'
import EditableInput from '../components/input/EditableInput'
import * as eventsActions from '../actions/eventsActions'
import Privacy from '../components/playlist/Privacy'
import Tags from '../components/profileContainer/profileContent/Tags'
import Restriction from '../components/Restriction'
import ApiError from '../components/ApiError'

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
    isRestricted: this.props.event[0].restriction.isRestricted,
    maxDistance: 1,
    startDate: new Date(this.props.event[0].restriction.startDate).toLocaleString(),
    endDate: new Date(this.props.event[0].restriction.endDate).toLocaleString(),
    mapRegion: null,
    lastLat: null,
    lastLong: null
  }

  componentWillMount() {
    const { privacy } = this.props.event[0]
    this.setState({ privacy: privacy === 'public' })
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        }
        this.onRegionChange(region, region.latitude, region.longitude)
      },
      error => console.log(error)
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    })
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

  handleRestriction = isRestricted => {
    this.setState({ isRestricted: !isRestricted })
    const { id } = this.props.event[0]
    this.props.eventsActions.updateEventRequest(
      id,
      'restriction.isRestricted',
      !this.state.isRestricted
    )
  }

  handleMaxDistance = maxDistance => {
    this.setState({ maxDistance })
    const { lastLat, lastLong } = this.state
    const location = lastLat.toString().concat(' ', lastLong.toString())
    const { id } = this.props.event[0]
    if (location && maxDistance) {
      this.props.eventsActions.updateEventRequest(id, 'restriction.maxDistance', maxDistance)
      this.props.eventsActions.updateEventRequest(id, 'restriction.location', location)
    }
  }

  handleDatePicked = (date, whichDate) => {
    const { id } = this.props.event[0]
    if (whichDate === 'start') {
      this.setState({ startDate: date.toLocaleString() })
      this.props.eventsActions.updateEventRequest(
        id,
        'restriction.startDate',
        new Date(date).getTime()
      )
    } else if (whichDate === 'end') {
      this.setState({ endDate: date.toLocaleString() })
      this.props.eventsActions.updateEventRequest(
        id,
        'restriction.endDate',
        new Date(date).getTime()
      )
    }
  }

  render() {
    const { isRestricted, privacyOption, maxDistance, startDate, endDate } = this.state
    const { name } = this.props.event[0]
    return this.props.event ? (
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Edit an event</Text>
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Text style={styles.title}>EVENT TITLE</Text>
            <EditableInput
              defaultValue={name}
              onChangeText={this.handleNameEdit}
              size={12}
              type={'name'}
              style={styles.userInfosValue}
            />
          </View>
          <View style={styles.divider} />
          <Privacy privacyOption={privacyOption} selectPrivacyOption={this.handlePrivacy} />
        </View>
        {!privacyOption ? (
          <View style={{ paddingTop: 15, paddingBottom: 5 }}>
            {this.props.events.error ? (
              <ApiError style={{ textAlign: 'center' }} error={this.props.events.error} />
            ) : null}
            <Tags
              allowedUsers={this.props.event[0].allowedUsers}
              event={this.props.event[0].id}
              eventsActions={this.props.eventsActions}
            />
            <View style={styles.divider} />
          </View>
        ) : null}

        <Restriction
          startDate={startDate}
          endDate={endDate}
          isRestricted={isRestricted}
          event={this.props.event[0]}
          maxDistance={maxDistance}
          selectRestrictionOption={this.handleRestriction}
          handleDatePicked={this.handleDatePicked}
          handleMaxDistance={this.handleMaxDistance}
        />
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
  const { events, playlist, user } = state
  const id = props.navigation.state.params.event
  return {
    events,
    playlist,
    user,
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
    paddingRight: 20,
    marginBottom: 10
  },
  userInfosValue: {
    color: colors.green01,
    maxWidth: 200,
    fontSize: 16
  },
  title: {
    color: colors.green01,
    fontWeight: '800',
    marginBottom: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})
