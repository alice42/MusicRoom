import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as playlistsActions from '../actions/playlistsActions'
import styles from '../styles/containers/HomeContainer'
import PlaylistContainer from '../containers/PlaylistContainer'
import Player from '../containers/Player'

class PlaylistScreen extends Component {
  state = {
    modalVisible: false,
    track: null,
    index: 0,
    tracks: null
  }

  // componentWillMount() {
  //   const { playlistId } = this.props.choosenPlaylist[0]
  //   this.props.playlistsActions.getPlaylistTracks(playlistId, '/mpe')
  // }

  handleOnPressEdit = event => {
    const { location } = this.props.navigation.state.params
    this.props.navigation.navigate('EditPlaylist', { event: event.id, location: location })
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

  render() {
    const event = this.props.choosenPlaylist[0]
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
                mpe={true}
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
                    marginLeft: -7,
                    color: colors.green02
                  }}
                />
              </TouchableOpacity>
            ) : null}
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
            mpe={true}
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
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { playlist } = state
  const id = props.navigation.state.params.playlist
  return {
    choosenPlaylist: playlist.list.filter(item => {
      if (item.id === id) {
        return item
      }
    })
  }
}

export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(PlaylistScreen)

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
