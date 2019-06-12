import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { colors } from '../constants/colors'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import Search from '../components/searchContainer/Search'
import Player from './Player'
import SeekBar from '../components/SeekBar'

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
    if (playlist === 'newPlaylist') {
      this.props.navigation.navigate('CreatePlaylist', {
        handleCreatePlaylist: this.handleCreatePlaylistFromAddTrack,
        type: 'playlist',
        track: track
      })
    } else {
      const { playlists } = this.props.user.data
      const { token } = this.props.user
      playlists.find(function(item) {
        if (item.name === playlist) {
          item.tracks.push(track)
          return item
        }
      })
      this.props.userActions.updateRequest(token, 'playlists', playlists)
    }
  }

  playTrack = track => {
    console.log('*****************PLAY TRACK', track)
    // const TRACKSTOPLAY = [
    //   {
    //     title: 'Stressed Out',
    //     artist: 'Twenty One Pilots',
    //     albumArtUrl:
    //       'http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg',
    //     audioUrl: `${track}`
    //   }
    // ]
    // console.log(TRACKSTOPLAY)
    this.setState({ TRACKS: track })
  }

  render() {
    // console.log(this.state.TRACKS)
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
      <View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Player tracks={TRACKSTOPLAY} />
          </View>
          <SearchConnected
            navigation={this.props.navigation}
            test={this.test}
            playTrack={this.playTrack}
          />
        </View>
      </View>
    )
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, search } = state
  return {
    user,
    search
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
