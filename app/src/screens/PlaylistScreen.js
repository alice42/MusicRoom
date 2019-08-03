import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import styles from '../styles/containers/HomeContainer'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistActions from '../actions/playlistActions'
import Search from '../components/searchContainer/Search'
import ListTracks from '../components/list/ListTracks'
import RoundedButton from '../components/button/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Player from '../containers/Player'
import DeletePlaylistModal from '../components/playlist/DeletePlaylistModal'
import UsersPlaylistModal from '../components/playlist/UsersPlaylistModal'

class PlaylistScreen extends Component {
  renderPlaylistTracks = () => {
    const { tracks } = this.props.playlist
    return <ListTracksConnected list={tracks} buttonPlay={true} buttonDel={true} handleOnPressDelete={this.handleOnPressDelete} />
  }

  handleAddTrack = () => {
    this.props.navigation.navigate('Search')
  }

  handleFollowers = () => {
    this.props.playlistActions.getDeezerFollowers(this.props.user.deezerId)
  }

  handleOnPressDelete = track => {
    if (track) {
      const { deezerId } = this.props.user
      const { deezerToken } = this.props.user
      const playlistId = this.props.playlist.playlistInfo.id
      const trackId = track.id
      this.props.playlistActions.deleteTrack(playlistId, trackId, deezerId, deezerToken)
    }
  }

  render() {
    const { tracks } = this.props.playlist
    const { playlistInfo } = this.props.playlist
    return (
      <View style={styles.wrapper}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={stylesBis.playlistTitle}>{playlistInfo.title}</Text>
            {playlistInfo.public ? <Text style={stylesBis.playlistPrivacy}>public</Text> : <Text style={stylesBis.playlistPrivacy}>private</Text>}
            {playlistInfo.collaborative ? <Text style={stylesBis.playlistPrivacy}>collaborative</Text> : null}
          </View>
          <View style={{ alignSelf: 'center' }}>
            <UsersPlaylistModal handleFollowers={this.handleFollowers} {...this.props} />
          </View>
        </View>
        <ScrollView style={{ backgroundColor: colors.gray03 }}>{this.renderPlaylistTracks()}</ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <RoundedButton
            text="add track"
            textColor={colors.white}
            background={colors.green01}
            border={colors.white}
            icon={
              <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                <Icons name="queue-music" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
                <Icon name="plus" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
              </View>
            }
            handleOnPress={this.handleAddTrack}
          />
        </View>
      </View>
    )
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    playlistActions: bindActionCreators(playlistActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, search, playlist } = state
  return {
    user,
    search,
    playlist
  }
}

const DeletePlaylistModalConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(DeletePlaylistModal)

const ListTracksConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ListTracks)

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistScreen)

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
