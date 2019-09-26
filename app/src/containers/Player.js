import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconSLI from 'react-native-vector-icons/SimpleLineIcons'
import * as playlistsActions from '../actions/playlistsActions'
import * as userActions from '../actions/userActions'
import Video from 'react-native-video'
import SeekBar from '../components/SeekBar'
import Controls from '../components/Controls'
import { colors } from '../constants/colors'

class Player extends Component {
  state = {
    paused: false,
    totalLength: null,
    currentPosition: null,
    selectedTrack: this.props.index
  }

  setDuration(data) {
    this.setState({ totalLength: Math.floor(data.duration) })
  }

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) })
    if (this.state.currentPosition === this.state.totalLength && this.state.totalLength) {
      this.setState({
        selectedTrack: this.state.selectedTrack + 1,
        paused: false,
        currentPosition: 0
      })
    }
  }

  seek(time) {
    time = Math.round(time)
    this.refs.audioElement && this.refs.audioElement.seek(time)
    this.setState({
      currentPosition: time,
      paused: false
    })
  }

  replay = () => {
    this.setState({ selectedTrack: 0, paused: false })
  }

  render() {
    const track = this.props.tracks[this.state.selectedTrack] || 0
    return track ? (
      <View style={{ backgroundColor: colors.green01, padding: 15 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: '#fff' }}>{track.title} - </Text>
            <Text style={{ color: '#fff' }}>{track.artistName}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.0} onPress={() => this.props.setModalVisible(false)}>
            <IconSLI style={{ color: colors.green02 }} name={'close'} size={22} />
          </TouchableOpacity>
        </View>
        <SeekBar
          onSeek={this.seek.bind(this)}
          trackLength={this.state.totalLength}
          onSlidingStart={() => this.setState({ paused: true })}
          currentPosition={this.state.currentPosition}
        />
        <Controls
          setModalVisible={this.props.setModalVisible}
          onBack={() => {
            this.setState({
              selectedTrack:
                this.state.selectedTrack === 0
                  ? this.props.tracks.length - 1
                  : this.state.selectedTrack - 1
            })
          }}
          onForward={() => {
            this.setState({
              selectedTrack:
                this.state.selectedTrack === this.props.tracks.length - 1
                  ? 0
                  : this.state.selectedTrack + 1
            })
          }}
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
    ) : (
      <View>
        <TouchableOpacity
          style={{ backgroundColor: colors.green01 }}
          onPress={() => this.props.setModalVisible(false)}
        >
          <IconSLI
            style={{ color: colors.green02, marginLeft: 'auto', paddingTop: 15, paddingRight: 15 }}
            name={'close'}
            size={22}
          />
        </TouchableOpacity>
        <View style={{ backgroundColor: colors.green01, padding: 32 }}>
          <Text style={styleModal.modalText}>{this.props.event.name}</Text>
          <TouchableOpacity onPress={() => this.replay()}>
            <Icon name={'repeat'} size={35} style={styleModal.modalIcon} />
          </TouchableOpacity>
        </View>
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

const styleModal = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  close: {
    marginRight: 'auto',
    marginLeft: 10,
    marginTop: -60,
    marginBottom: -50
  },
  modalContent: {
    width: 300,
    marginBottom: 30,
    height: 510
  },
  modalContent2: {
    width: 300,
    marginTop: 180,
    height: 510
  },
  modalText: {
    display: 'flex',
    alignSelf: 'center',
    color: colors.white,
    marginBottom: 30,
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: '600'
  },
  modalIcon: {
    display: 'flex',
    alignSelf: 'center',
    color: colors.white
  }
})
