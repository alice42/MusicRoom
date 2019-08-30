import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as eventsActions from '../actions/eventsActions'
import styles from '../styles/containers/HomeContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import Player from '../containers/Player'
import * as playlistsActions from '../actions/playlistsActions'
const { width } = Dimensions.get('window')
class EventScreen extends Component {
  state = {
    modalVisible: false,
    track: null,
    index: 0,
    tracks: null
  }

  componentWillMount() {
    const { playlistId } = this.props.event[0]
    this.props.playlistsActions.getPlaylistTracks(playlistId, '/mtv')
  }

  handleOnPressEdit = event => {
    const { location } = this.props.navigation.state.params
    this.props.navigation.navigate('EditEvent', { event: event.id, location: location })
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  play = (index, track, tracks) => {
    this.setModalVisible(true)
    this.setState({ track: track, index, tracks })
  }

  onBackImage = index => {
    const { tracks } = this.state
    this.setState({
      track: tracks[this.state.index === 0 ? this.state.tracks.length - 1 : this.state.index - 1],
      index: this.state.index === 0 ? this.state.tracks.length - 1 : this.state.index - 1
    })
  }
  onForwardImage = index => {
    const { tracks } = this.state
    this.setState({
      track: tracks[this.state.index === this.state.tracks.length - 1 ? 0 : index + 1],
      index: this.state.index === this.state.tracks.length - 1 ? 0 : index + 1
    })
  }
  handleVote = (track, value) => {
    const event = this.props.event[0]
    this.props.eventsActions.vote(track.id, event.id, value)
  }

  render() {
    const event = this.props.event[0]
    const { canEdit } = event
    const { track, index, tracks } = this.state
    return (
      <View style={styles.wrapper}>
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styleModal.modal}>
            <TouchableOpacity
              style={styleModal.close}
              onPress={() => this.setState({ modalVisible: false })}
            >
              <Icon name="close" size={26} style={{ color: colors.white }} />
            </TouchableOpacity>
            {event.playlistId ? (
              <Player
                mtv={true}
                image={true}
                play={this.play}
                event={event}
                track={track}
                index={index}
                tracks={tracks}
                backgroundColor={'transparent'}
              />
            ) : null}
          </View>
        </Modal>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View
            style={{
              width: width - 30,
              marginBottom: 'auto',
              marginTop: 'auto',
              color: colors.green02
            }}
          >
            <Text ellipsizeMode="tail" numberOfLines={1} style={stylesBis.heading}>
              {event.name}
            </Text>
          </View>
          <View style={{ marginBottom: 'auto', marginTop: 'auto', color: colors.green02 }}>
            <TouchableOpacity onPress={() => this.handleOnPressEdit(event)} disabled={!canEdit}>
              <Icon
                name="edit"
                size={20}
                style={{ marginBottom: 'auto', marginTop: 'auto', color: colors.green02 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <PlaylistContainer
            location={this.props.navigation.state.params.location}
            setModalVisible={this.setModalVisible}
            visible={this.state.visible}
            play={this.play}
            event={event}
            track={track}
            index={index}
            tracks={tracks}
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

const styleModal = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  // modalContent: {
  //   width: 300,
  //   marginBottom: -65,
  //   height: 510
  // },
  close: {
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: -60,
    marginBottom: -50
  }
})
