import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, ScrollView, StyleSheet, Dimensions, Alert } from 'react-native'
import { colors } from '../constants/colors'
import styles from '../styles/containers/HomeContainer'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistsActions from '../actions/playlistsActions'
import * as errorActions from '../actions/errorActions'
import ListTracks from '../components/list/ListTracks'
import RoundedButton from '../components/button/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Loader from '../components/Loader'
import Player from './Player'
const { height } = Dimensions.get('window')

class EventContainer extends Component {
  state = {
    modalVisible: false,
    track: null,
    index: 0,
    tracks: this.props.playlist.currentPlaylist
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  play = (index, track, tracks) => {
    this.setModalVisible(true)
    this.setState({ track: track, index, tracks })
  }

  handleDeleteTrack = track => {
    const service ='/mtv'
    const trackId = track.id
    const { location } = this.props
    const { playlistId } = this.props.event
    this.props.playlistsActions.removeTrackMtv(playlistId, trackId, service, location)
  }
  renderPlaylistTracks = () => {
    const { list } = this.props.playlist.currentPlaylist

    return (
      <ListTracksConnected
        canEdit={this.props.canEdit}
        list={list}
        buttonPlay={true}
        buttonDel={true}
        play={this.play}
        mtv={this.props.mtv}
        handleVote={this.props.handleVote}
        handleDeleteTrack={this.handleDeleteTrack}
      />
    )
  }
  handleAddTrack = () => {
    this.props.navigation.navigate('Search', {
      playlist: this.props.playlistId,
      service:'/mtv'
    })
  }

  componentWillMount() {
    const { playlistId } = this.props.event
    const service ='/mtv'

    this.props.playlistsActions.getPlaylistTracksMtv(playlistId, service)
  }
  alert = () => {
    return Alert.alert(
      'MUSICROOM TRACKS',
      `${this.props.error.errorTrack}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }
  render() {
    const { event } = this.props
    const { track, index, tracks, modalVisible } = this.state
    return (
      <View style={styles.wrapperBis}>
        <ScrollView
          style={{
            backgroundColor: colors.gray03,
            display: 'flex',
            height: modalVisible ? height - 440 : height - 255
          }}
        >
          {this.props.error.errorTrack ? this.alert() : null}
          {this.props.playlist.currentPlaylist.isFetching ? (
            <View style={{ marginTop: height / 2 - 170 }}>
              <Loader />
            </View>
          ) : (
            this.renderPlaylistTracks()
          )}
        </ScrollView>
        <View style={{ borderTopColor: colors.green02, borderTopWidth: 2 }}>
          {event.playlistId && tracks && track && modalVisible ? (
            <Player
              modalVisible={this.state.modalVisible}
              setModalVisible={this.setModalVisible}
              image={false}
              play={this.play}
              event={event}
              track={track}
              index={index}
              tracks={tracks}
              backgroundColor={colors.green01}
            />
          ) : null}
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          {this.props.canEdit ? 
          <RoundedButton
            text="add track"
            textColor={colors.white}
            background={colors.green01}
            border={colors.white}
            icon={
              <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                <Icons
                  name="queue-music"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
                <Icon name="plus" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
              </View>
            }
            handleOnPress={this.handleAddTrack}
          /> : null}
        </View>
      </View>
    )
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    playlistsActions: bindActionCreators(playlistsActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, search, playlist, error } = state
  return {
    user,
    search,
    playlist,
    error
  }
}

const ListTracksConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ListTracks)

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(EventContainer)

const stylesBis = StyleSheet.create({
  wrapper: {
    display: 'flex'
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
