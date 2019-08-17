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
  test = track => {
    const { playlist } = this.props.navigation.state.params
    this.props.playlistActions.addtrackToPlaylist(track.id, playlist)
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
    playlistActions: bindActionCreators(playlistActions, dispatch)
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
