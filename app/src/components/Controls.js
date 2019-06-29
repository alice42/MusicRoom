import React, { Component } from 'react'

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

class Controls extends Component {
  render() {
    // console.log(this.props.paused)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.0}
          onPress={this.props.onPressShuffle}
        >
          <Image source={require('../img/ic_shuffle_white.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity onPress={this.props.onBack}>
          <Image source={require('../img/ic_skip_previous_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        {!this.props.paused ? (
          <TouchableOpacity onPress={this.props.onPressPause}>
            <View style={styles.playButton}>
              <Image source={require('../img/ic_pause_white_48pt.png')} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.props.onPressPlay}>
            <View style={styles.playButton}>
              <Image source={require('../img/ic_play_arrow_white_48pt.png')} />
            </View>
          </TouchableOpacity>
        )}
        <View style={{ width: 20 }} />
        <TouchableOpacity onPress={this.props.onForward}>
          <Image source={require('../img/ic_skip_next_white_36pt.png')} />
        </TouchableOpacity>
        <View style={{ width: 40 }} />
        <TouchableOpacity
          activeOpacity={0.0}
          onPress={this.props.onPressRepeat}
        >
          <Image source={require('../img/ic_repeat_white.png')} />
        </TouchableOpacity>
      </View>
    )
  }
}

export default Controls

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryControl: {
    height: 18,
    width: 18
  },
  off: {
    opacity: 0.3
  }
})
