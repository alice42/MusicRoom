import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../constants/colors'
import EditableInput from '../components/input/EditableInput'
import * as eventsActions from '../actions/eventsActions'
import * as errorActions from '../actions/errorActions'
import Privacy from '../components/playlist/Privacy'
import Tags from '../components/profileContainer/profileContent/Tags'
import Rights from '../components/playlist/Rights'
import Votes from '../components/profileContainer/profileContent/Votes'
import Restriction from '../components/Restriction'

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
    privacyOption: this.props.event[0].visibility.privacy === 'public' ? true : false,
    privacyOptionVote: this.props.event[0].vote.privacy === 'public' ? true : false,
    isRestricted: this.props.event[0].vote.restriction.isRestricted,
    maxDistance: parseInt(this.props.event[0].vote.restriction.maxDistance),
    startDate: new Date(this.props.event[0].vote.restriction.startDate).toLocaleString(),
    endDate: new Date(this.props.event[0].vote.restriction.endDate).toLocaleString(),
    latitude: parseFloat(this.props.event[0].vote.restriction.location.split(' ')[0]),
    longitude: parseFloat(this.props.event[0].vote.restriction.location.split(' ')[1]),
    mapRegion: null,
    latitudeDelta: 0.00922 * 2.5,
    longitudeDelta: 0.00421 * 2.5,
    zoom: 0,
    marker: false,
    markerCoord: {
      longitude: null,
      latitude: null
    }
  }

  onMapPress = e => {
    this.setState({ markerCoord: e.nativeEvent.coordinate})
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
    const { id } = this.props.event[0]
    this.setState({latitude: region.latitude, longitude: region.longitude})
    const { location } = this.props.navigation.state.params
    const locationEvent = region.latitude.toString().concat(' ', region.longitude.toString())
    this.props.eventsActions.updateEventRequest(id, 'vote.restriction.location', locationEvent, location)
    this.onRegionChange(region, region.latitude, region.longitude)
  }

  onRegionChange = (region, latitude, longitude) => {
    this.setState({
      mapRegion: region,
      latitude: latitude || this.state.latitude,
      longitude: longitude || this.state.longitude
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  componentWillMount() {
    const { privacy } = this.props.event[0].visibility
    this.setState({ privacy: privacy === 'public' })
    // const  privacyVote = this.props.event[0].vote.privacy
    // this.setState({ privacyVote: privacyVote === 'public' })
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleNameEdit = name => {
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    this.props.eventsActions.updateEventRequest(id, 'name', name, location)
  }

  handlePrivacy = privacyValue => {
    this.setState({ privacyOption: !privacyValue })
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    const privacy = this.state.privacyOption ? 'private' : 'public'
    this.props.eventsActions.updateEventRequest(id, 'visibility.privacy', privacy, location)
  }

  handlePrivacyVote = privacyValue => {
    this.setState({ privacyOptionVote: !privacyValue })
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    const privacy = this.state.privacyOptionVote ? 'private' : 'public'
    this.props.eventsActions.updateEventRequest(id, 'vote.privacy', privacy, location)
  }

  handleRestriction = isRestricted => {
    this.setState({ isRestricted: !isRestricted })
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    this.props.eventsActions.updateEventRequest(
      id,
      'vote.restriction.isRestricted',
      !this.state.isRestricted,
      location
    )
  }

  handleMaxDistance = maxDistance => {
    this.setState({ maxDistance })
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    this.props.eventsActions.updateEventRequest(
      id,
      'vote.restriction.maxDistance',
      maxDistance,
      location
    )
  }

  handleDatePicked = (date, whichDate) => {
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    if (whichDate === 'start') {
      this.setState({ startDate: date.toLocaleString() })
      this.props.eventsActions.updateEventRequest(
        id,
        'vote.restriction.startDate',
        new Date(date).getTime(),
        location
      )
    } else if (whichDate === 'end') {
      this.setState({ endDate: date.toLocaleString() })
      this.props.eventsActions.updateEventRequest(
        id,
        'vote.restriction.endDate',
        new Date(date).getTime(),
        location
      )
    }
  }

  onPressZoomIn = () => {
    if (this.state.zoom > -3){
      this.setState({zoom: this.state.zoom-1})
    region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: this.state.latitudeDelta * 10,
      longitudeDelta: this.state.longitudeDelta * 10
    }
    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      latitude: region.latitude,
      longitude: region.longitude
    })
    this.onRegionChange(region, region.latitude, region.longitude)
    }
  }

  onPressZoomOut = () => {
    if (this.state.zoom <= 4){
    this.setState({zoom: this.state.zoom+1})
    region = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: this.state.latitudeDelta / 10,
      longitudeDelta: this.state.longitudeDelta / 10
    }
    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      latitude: region.latitude,
      longitude: region.longitude
    })
    this.onRegionChange(region, region.latitude, region.longitude)
    }
  }

  render() {
    const {
      isRestricted,
      privacyOption,
      privacyOptionVote,
      maxDistance,
      startDate,
      endDate,
      mapRegion,
      latitude,
      longitude
    } = this.state
    const { name } = this.props.event[0]
    return this.props.event ? (
      <ScrollView style={styles.wrapper}>
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
            <Tags
              location={this.props.navigation.state.params.location}
              allowedUsers={this.props.event[0].visibility.allowedUsers}
              allowedUsersEvent={true}
              event={this.props.event[0].id}
              eventsActions={this.props.eventsActions}
            />
          </View>
        ) : null}
        <View style={styles.divider} />
          <Rights privacyOption={privacyOptionVote} selectPrivacyOption={this.handlePrivacyVote} />
         {!privacyOptionVote ? (
          <View style={{ paddingTop: 15, paddingBottom: 5 }}>
            <Votes
              location={this.props.navigation.state.params.location}
              allowedUsers={this.props.event[0].vote.allowedUsers}
              allowedUsersEvent={true}
              event={this.props.event[0].id}
              eventsActions={this.props.eventsActions}
            />
            <View style={styles.divider1} />
          </View>
        ) : null}
        <Restriction
          markerCoord={this.state.markerCoord}
          marker={this.state.marker}
          zoom={this.state.zoom}
          onPressZoomOut={this.onPressZoomOut}
          onPressZoomIn={this.onPressZoomIn}
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
      </ScrollView>
    ) : null
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { events, playlist, user, error } = state
  const id = props.navigation.state.params.event
  return {
    error,
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
    borderBottomWidth: 4,
    borderBottomColor: colors.green02,
    height: 1,
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  },
  divider1: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})
