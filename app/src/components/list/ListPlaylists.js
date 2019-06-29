import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import { colors } from '../../constants/colors'
import DeezerManager from '../../services/deezerService'

export default class playlists extends Component {
  handleOnPress = playlist => {
    this.props.playlistActions.setPlaylistTracks(playlist.id)
    this.props.navigation.navigate('Playlist', { playlist: playlist })
    // this.props.navigation.navigate(
    //   'Playlist'
    //   // {
    //   //   playlist: this.props.playlistInfo
    //   // }
    // )
  }

  renderplaylists() {
    const { list } = this.props
    return list.map((playlist, index) => (
      <TouchableOpacity
        key={`playlist-${index}`}
        style={{ marginTop: 10 }}
        onPress={() => this.handleOnPress(playlist)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.playlistTitle}>{playlist.title}</Text>
          </View>
          <Icon
            name={'chevron-right'}
            size={20}
            style={{ color: colors.green01 }}
          />
        </View>
      </TouchableOpacity>
    ))
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>{this.renderplaylists()}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
