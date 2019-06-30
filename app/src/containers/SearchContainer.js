import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { colors } from '../constants/colors'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistActions from '../actions/playlistActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import DeezerManager from '../services/deezerService'
import Search from '../components/searchContainer/Search'
import Player from './Player'
import SeekBar from '../components/SeekBar'
import styles from '../styles/containers/HomeContainer'
class SearchContainer extends Component {
  state = {
    TRACKS: []
  }
  handleCreatePlaylistFromAddTrack = (title, privacy, track) => {
    const tracks = []
    tracks.push(track)
    const newPlaylist = {
      name: title,
      privacy: privacy,
      tracks: tracks
    }
    const { playlists } = this.props.user.data
    const { token } = this.props.user
    playlists.push(newPlaylist)
    this.props.userActions.updateRequest(token, 'playlists', playlists)
  }

  test = (track, playlist) => {
    const { deezerToken } = this.props.user
    if (playlist === 'newPlaylist') {
      // this.props.navigation.navigate('CreatePlaylist', {
      //   handleCreatePlaylist: this.handleCreatePlaylistFromAddTrack,
      //   type: 'playlist',
      //   track: track
      // })
      //create a playlist
    } else {
      // const { playlists } = this.props.user.data
      // const { token } = this.props.user
      // playlists.find(function(item) {
      //   if (item.name === playlist) {
      //     item.tracks.push(track)
      //     return item
      //   }
      // })
      this.props.playlistActions.editPlaylist(track.id, playlist, deezerToken)
    }
  }

  playTrack = track => {
    // const TRACKSTOPLAY = [
    //   {
    //     title: 'Stressed Out',
    //     artist: 'Twenty One Pilots',
    //     albumArtUrl:
    //       'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
    //     audioUrl: `${track}`
    //   }
    // ]
    this.setState({ TRACKS: track })
  }

  render() {
    const TRACKSTOPLAY = [
      {
        title: 'Stressed Out',
        artist: 'Twenty One Pilots',
        albumArtUrl:
          'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
        audioUrl: `${this.state.TRACKS}`
      }
    ]
    return (
      <View style={styles.wrapper}>
        {/* <View style={{ marginTop: 50 }}> */}
        {/* <View>
            <Player tracks={TRACKSTOPLAY} />
          </View> */}
        <SearchConnected
          navigation={this.props.navigation}
          test={this.test}
          playTrack={this.playTrack}
        />
        {/* </View> */}
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

const SearchConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Search)

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(SearchContainer)