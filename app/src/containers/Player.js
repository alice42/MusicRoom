import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StatusBar } from 'react-native'
import * as eventsActions from '../actions/eventsActions'
import * as playlistsActions from '../actions/playlistsActions'
import * as userActions from '../actions/userActions'
import Video from 'react-native-video'
import SeekBar from '../components/SeekBar'
import Controls from '../components/Controls'
import { colors } from '../constants/colors'

class Player extends Component {
  state = {
    paused: true,
    totalLength: this.props.playlist.currentPlaylist.list.length,
    currentPosition: 0,
    selectedTrack: this.props.index || 0
  }
  componentWillMount() {
    const { playlistId } = this.props
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

  render() {
    const track =
      this.props.track || this.props.playlist.currentPlaylist.list[this.state.selectedTrack]
    return (
      <View style={{ backgroundColor: this.props.backgroundColor, padding: 15 }}>
        {track ? (
          <View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: '#fff' }}>{track.title} - </Text>
              <Text style={{ color: '#fff' }}>{track.artistName}</Text>
            </View>
            <SeekBar
              onSeek={this.seek.bind(this)}
              trackLength={this.state.totalLength}
              onSlidingStart={() => this.setState({ paused: true })}
              currentPosition={this.state.currentPosition}
            />
            <Controls
              onPressPlay={() => this.setState({ paused: false })}
              onPressPause={() => this.setState({ paused: true })}
              paused={this.state.paused}
            />
            <Video
              source={{ uri: `${track.previewUrl}` }}
              paused={this.state.paused}
              onLoad={this.setDuration.bind(this)}
              onProgress={this.setTime.bind(this)}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
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

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Player)
