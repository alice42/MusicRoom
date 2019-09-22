import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as eventsActions from '../actions/eventsActions'
import styles from '../styles/containers/HomeContainer'
import EventContainer from '../containers/EventContainer'
import * as playlistsActions from '../actions/playlistsActions'

class EventScreen extends Component {
  handleOnPressEdit = event => {
    const { location } = this.props.navigation.state.params
    this.props.navigation.navigate('EditEvent', { event: event.id, location: location })
  }

  handleVote = (track, value) => {
    const event = this.props.event[0]
    this.props.eventsActions.vote(track.id, event.id, value)
  }

  render() {
    const event = this.props.event[0]
    const { canEdit } = event
    return (
      <View style={styles.wrapper}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ olor: colors.green02 }}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={stylesBis.heading}>
              {event.name}
            </Text>
          </View>
          <View style={{ marginBottom: 'auto', marginTop: 'auto', color: colors.green02 }}>
            {canEdit ? (
              <TouchableOpacity onPress={() => this.handleOnPressEdit(event)}>
                <Icon
                  name="edit"
                  size={20}
                  style={{
                    marginBottom: 'auto',
                    marginTop: 'auto',
                    marginLeft: -5,
                    color: colors.green02
                  }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View>
          <EventContainer
            canEdit={canEdit}
            location={this.props.navigation.state.params.location}
            event={event}
            mtv={true}
            handleVote={this.handleVote}
            playlistId={event.playlistId}
            navigation={this.props.navigation}
          />
        </View>
      </View>
    )
  }
}

function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch),
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { events, playlist } = state
  const id = props.navigation.state.params.event
  return {
    playlist,
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
)(EventScreen)

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
