import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
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
// import MapView from 'react-native-maps'
// import Map from '../components/MapComponent'

const { width, height } = Dimensions.get('window')

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
    maxDistance: parseInt(this.props.event[0].restriction.maxDistance),
    startDate: new Date(this.props.event[0].restriction.startDate).toLocaleString(),
    endDate: new Date(this.props.event[0].restriction.endDate).toLocaleString(),
    mapRegion: null,
    latitude: parseInt(this.props.event[0].restriction.location.split(' ')[0]),
    longitude: parseInt(this.props.event[0].restriction.location.split(' ')[1]),
    mapRegion: null,
    latitudeDelta: 0.00922 * 2.5,
    longitudeDelta: 0.00421 * 2.5
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(position => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
      }
      this.onRegionChange(region, region.latitude, region.longitude)
    })
  }

  onMapPress = e => {
    console.log(e.nativeEvent.coordinate.longitude)
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta
    }
    this.onRegionChange(region, region.latitude, region.longitude)
  }

  onRegionChange = (region, latitude, longitude) => {
    this.setState({
      mapRegion: region,
      // If there are no new values set use the the current ones
      latitude: latitude || this.state.latitude,
      longitude: longitude || this.state.longitude
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  componentWillMount() {
    const { privacy } = this.props.event[0]
    this.setState({ privacy: privacy === 'public' })
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
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
    const { id } = this.props.event[0]
    this.props.eventsActions.updateEventRequest(id, 'restriction.maxDistance', maxDistance)
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
    const {
      isRestricted,
      privacyOption,
      maxDistance,
      startDate,
      endDate,
      mapRegion,
      latitude,
      longitude
    } = this.state
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
          mapRegion={mapRegion}
          latitude={latitude}
          longitude={longitude}
          latitudeDelta={this.state.latitudeDelta}
          longitudeDelta={this.state.longitudeDelta}
          startDate={startDate}
          endDate={endDate}
          isRestricted={isRestricted}
          event={this.props.event[0]}
          maxDistance={maxDistance}
          selectRestrictionOption={this.handleRestriction}
          handleDatePicked={this.handleDatePicked}
          handleMaxDistance={this.handleMaxDistance}
          onMapPress={this.onMapPress}
          onRegionChange={this.onRegionChange}
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
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    paddingTop: 10
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
    paddingRight: 20
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
