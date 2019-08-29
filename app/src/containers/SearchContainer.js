import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { colors } from '../constants/colors'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistsActions from '../actions/playlistsActions'
import Icon from 'react-native-vector-icons/FontAwesome'
import DeezerManager from '../services/deezerService'
import Search from '../components/searchContainer/Search'
import Player from './Player'
import SeekBar from '../components/SeekBar'
import styles from '../styles/containers/HomeContainer'

class SearchContainer extends Component {
  test = track => {
    const { playlist, service } = this.props.navigation.state.params
    this.props.playlistsActions.addtrackToPlaylist(track.id, playlist, service)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <SearchConnected
          navigation={this.props.navigation}
          test={this.test}
          playTrack={this.playTrack}
        />
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
  const { user, search, playlist, events } = state
  return {
    user,
    events,
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
