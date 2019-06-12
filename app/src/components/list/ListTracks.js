import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import * as userActions from '../../actions/userActions'
import * as searchActions from '../../actions/searchActions'
import { colors } from '../../constants/colors'
import ChoosePlaylistModal from '../playlist/ChoosePlaylistModal'

const { width, height } = Dimensions.get('window')

export default class listTracks extends Component {
  renderplaylist() {
    const { list, buttons } = this.props

    return list.map((track, index) => (
      <View key={`track-${index}`}>
        <View style={{ display: 'flex' }}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: colors.green02,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: `${track.album.cover_small}`
                }}
              />
              {/* <Icon name="music" size={24} style={{ color: colors.white }} /> */}
            </View>
            <View style={{ justifyContent: 'center', width: width - 180 }}>
              <Text style={styles.trackTitle}>{track.title}</Text>
              <Text style={styles.trackTitle}>{track.artist.name}</Text>
            </View>
            {buttons ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.playTrack(track.preview)}
                  style={{
                    justifyContent: 'center',
                    marginLeft: 5
                  }}
                >
                  <Icon
                    name="play"
                    size={18}
                    style={{
                      color: colors.white,
                      backgroundColor: colors.green02,
                      padding: 10,
                      marginRight: 8
                    }}
                  />
                </TouchableOpacity>
                <ChoosePlaylistModalConnected
                  track={track}
                  navigation={this.props.navigation}
                  test={this.props.test}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    ))
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.list ? (
          <ScrollView>{this.renderplaylist()}</ScrollView>
        ) : null}
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

const ChoosePlaylistModalConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ChoosePlaylistModal)

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
