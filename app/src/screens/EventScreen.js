import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as eventsActions from '../actions/eventsActions'
import styles from '../styles/containers/HomeContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import Player from '../containers/Player'
import Video from 'react-native-video'
import SeekBar from '../components/SeekBar'
import Controls from '../components/Controls'
import * as playlistsActions from '../actions/playlistsActions'

class EventScreen extends Component {
  state = {
    modalVisible: false,
    paused: true,
    totalLength: 1,
    currentPosition: 0,
    selectedTrack: 0,
    track: null,
    index: 0,
    tracks: null
  }

  componentWillMount() {
    const { playlistId } = this.props.event[0]
    this.props.playlistsActions.getPlaylistTracks(playlistId)
  }

  setDuration(data) {
    this.setState({ totalLength: Math.floor(data.duration) })
  }

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) })
  }

  seek(time) {
    time = Math.round(time)
    this.refs.audioElement && this.refs.audioElement.seek(time)
    this.setState({
      currentPosition: time,
      paused: false
    })
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
  player = () => {
    const event = this.props.event[0]
    const { canEdit } = event
    const { track, index, tracks } = this.state
    return track && !this.state.modalVisible ? (
      <View>
        <Player
          backgroundColor={colors.green01}
          playlistId={event.playlistId}
          track={track}
          index={index}
          tracks={tracks}
        />
      </View>
    ) : null
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
            {track ? (
              <Image
                style={styleModal.modalContent}
                source={{
                  uri: `${track.albumCover}`
                }}
              />
            ) : null}
            {event.playlistId ? (
              <Player
                playlistId={event.playlistId}
                track={track}
                index={index}
                tracks={tracks}
                backgroundColor={'transparent'}
              />
            ) : null}
          </View>
        </Modal>
        {/* {track && !this.state.modalVisible ? (
          <View>
            <Player
              backgroundColor={colors.green01}
              playlistId={event.playlistId}
              track={track}
              index={index}
              tracks={tracks}
            />
          </View>
        ) : null} */}
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
            play={this.play}
            player={this.player}
            track={track}
            index={index}
            tracks={tracks}
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
  modalContent: {
    width: 300,
    marginBottom: -65,
    height: 510
  },
  close: {
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: -60,
    marginBottom: -50
  }
  // modalTitle: {
  //   backgroundColor: colors.darkOrange,
  //   width: 300,
  //   height: 70,
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   zIndex: 8,
  //   marginBottom: 15,
  //   position: 'absolute'
  // },
  // modalText: {
  //   color: colors.white,
  //   fontSize: 26,
  //   fontWeight: '800',
  //   display: 'flex',
  //   flex: 0.9,
  //   width: 300,
  //   height: 210,
  //   backgroundColor: 'red'
  // },
  // modalTextInvers: {
  //   textAlign: 'center',
  //   marginTop: 110,
  //   marginRight: 10,
  //   color: colors.darkOrange,
  //   fontSize: 26,
  //   fontWeight: '800'
  // },
  // modalSubtext: {
  //   textAlign: 'center',
  //   color: colors.gray01,
  //   fontSize: 14,
  //   fontWeight: '500',
  //   marginBottom: 10
  // },
  // modalSubtextInvers: {
  //   textAlign: 'center',
  //   color: colors.gray02,
  //   fontSize: 14,
  //   fontWeight: '500',
  //   marginTop: 10,
  //   marginBottom: 10
  // },
  // modalPicker: {
  //   position: 'relative',
  //   marginTop: 30
  // },
  // modalValidationButton: {
  //   backgroundColor: colors.darkOrange,
  //   width: 300,
  //   height: 50,
  //   borderBottomLeftRadius: 30,
  //   borderBottomRightRadius: 30,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // modalValidationButton1: {
  //   backgroundColor: colors.darkOrange,
  //   width: 300,
  //   height: 50,
  //   borderBottomWidth: 2,
  //   borderBottomColor: colors.white,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // privacyIcon: {
  //   color: colors.black,
  //   marginRight: 15,
  //   marginTop: 10
  // }
})
