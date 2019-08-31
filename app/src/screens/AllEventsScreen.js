import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../components/button/RoundedButton'
import styles from '../styles/containers/HomeContainer'
import * as eventsActions from '../actions/eventsActions'
import ListEvents from '../components/list/ListEvents'
import { colors } from '../constants/colors'
import * as errorActions from '../actions/errorActions'
import Loader from '../components/Loader'

const { height } = Dimensions.get('window')

class AllEventsScreen extends Component {
  state = {
    location: null
  }
  componentWillMount() {
    this.watchIDUser = navigator.geolocation.getCurrentPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
      const location = region.latitude.toString().concat(' ', region.longitude.toString())
      this.setState({ location })
      this.props.eventsActions.getEvents(location)
    })
  }

  handleDeleteEvent = event => {
    const { location } = this.state
    this.props.eventsActions.deleteEventRequest(event, location)
  }

  handleCreateEvent = name => {
    const { location } = this.state
    this.props.eventsActions.createEventRequest(name, location)
  }

  handleCreateEventRequest = () => {
    this.props.navigation.navigate('CreateEvent', {
      handleCreateEvent: this.handleCreateEvent
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchIDUser)
  }

  renderEventslist = () => {
    const { list } = this.props.events
    const { location } = this.state
    return (
      <ListEvents
        list={list}
        location={location}
        handleDeleteEvent={this.handleDeleteEvent}
        {...this.props}
      />
    )
  }
  alert = () => {
    return Alert.alert(
      'MUSICROOM EVENT',
      `${this.props.error.errorEvents}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      {
        cancelable: false
      }
    )
  }

  render() {
    return this.state.location ? (
      <View style={styles.wrapper}>
        <View style={{ display: 'flex', flex: 1 }}>
          <Text style={stylesBis.heading}>ALL EVENTS</Text>
          <View>
            <ScrollView style={{ backgroundColor: colors.gray03, height: height - 240 }}>
              {this.props.error.errorEvents ? this.alert() : null}
              {this.props.events.isFetching ? (
                <View style={{ marginTop: height / 2 - 170 }}>
                  <Loader />
                </View>
              ) : (
                this.renderEventslist()
              )}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <RoundedButton
                text={'Create a new event'}
                textColor={colors.white}
                background={colors.green01}
                border={colors.white}
                icon={
                  <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                    <Icon name="music" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
                    <Icon name="plus" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
                  </View>
                }
                handleOnPress={this.handleCreateEventRequest}
              />
            </View>
          </View>
        </View>
      </View>
    ) : null
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function mapStateToProps(state) {
  const { events, error } = state
  return {
    events,
    error
  }
}

export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(AllEventsScreen)

const stylesBis = StyleSheet.create({
  wrapper: {
    display: 'flex'
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.green01,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray04,
    marginTop: 2
  },
  playlistPrivacy: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.lightGray,
    marginTop: 4,
    marginLeft: 5
  },
  playlistDate: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.green01,
    marginTop: 2
  }
})
