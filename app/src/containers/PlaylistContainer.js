import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import { colors } from '../constants/colors'
import styles from '../styles/containers/HomeContainer'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistsActions from '../actions/playlistsActions'
import ListTracks from '../components/list/ListTracks'
import RoundedButton from '../components/button/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Loader from '../components/Loader'

const { width, height } = Dimensions.get('window')

class PlaylistContainer extends Component {
  renderPlaylistTracks = () => {
    const { list } = this.props.playlist.currentPlaylist
    return (
      <ListTracksConnected
        list={list}
        buttonPlay={true}
        buttonDel={true}
        mtv={this.props.mtv}
        handleVote={this.props.handleVote}
        handleOnPressDelete={this.handleOnPressDelete}
      />
    )
  }
  handleOnPressDelete = track => {
    if (track) {
      const { deezerId } = this.props.user
      const { deezerToken } = this.props.user
      const playlistId = this.props.playlist.playlistInfo.id
      const trackId = track.id
      this.props.playlistsActions.deleteTrack(playlistId, trackId, deezerId, deezerToken)
    }
  }
  handleAddTrack = () => {
    this.props.navigation.navigate('Search', { playlist: this.props.playlistId })
  }

  componentWillMount() {
    const { playlistId } = this.props
    this.props.playlistsActions.getPlaylistTracks(playlistId)
  }

  render() {
    return (
      <View style={styles.wrapperBis}>
        <ScrollView
          style={{
            backgroundColor: colors.gray03,
            display: 'flex',
            height: height - 240
          }}
        >
          {this.props.playlist.currentPlaylist.isFetching ? (
            <View style={{ marginTop: height / 2 - 170 }}>
              <Loader />
            </View>
          ) : (
            this.renderPlaylistTracks()
          )}
        </ScrollView>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
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

const ListTracksConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ListTracks)

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistContainer)

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
