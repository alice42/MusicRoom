import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as eventsActions from '../actions/eventsActions'
import styles from '../styles/containers/HomeContainer'
import PlaylistContainer from '../containers/PlaylistContainer'

class EventScreen extends Component {
  handleOnPressEdit = event => {
    this.props.navigation.navigate('EditEvent', { event: event.id })
  }
  renderPlaylistTracks = () => {
    const { tracks } = this.props.playlist
    return (
      <ListTracksConnected
        list={tracks}
        buttonPlay={true}
        buttonDel={true}
        handleOnPressDelete={this.handleOnPressDelete}
      />
    )
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
          <Text style={stylesBis.heading}>{event.name}</Text>
          <Text />
          <TouchableOpacity onPress={() => this.handleOnPressEdit(event)} disabled={!canEdit}>
            <Icon
              name="edit"
              size={20}
              style={{ marginBottom: 'auto', marginTop: 'auto', color: colors.green02 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <PlaylistContainer
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
