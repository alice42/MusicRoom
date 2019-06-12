import React, { Component } from 'react'
import { View, Text, StatusBar } from 'react-native'
import Video from 'react-native-video'
import SeekBar from '../components/SeekBar'
import Controls from '..//components/Controls'
import { colors } from '../constants/colors'

export default class Player extends Component {
  state = {
    paused: true,
    totalLength: 1,
    currentPosition: 0,
    selectedTrack: 0
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
    console.log('THIS PROPS TRACKS ', this.props.tracks)
    const track = this.props.tracks[this.state.selectedTrack]
    console.log('TRACK', track)
    return (
      <View style={{ backgroundColor: colors.green01, padding: 5 }}>
        <Text>{track.title}</Text>
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
          source={{ uri: `${track.audioUrl}` }} // Can be a URL or a local file.
          paused={this.state.paused} // Pauses playback entirely.
          onLoad={this.setDuration.bind(this)} // Callback when video loads
          onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
        />
      </View>
    )
  }
}
