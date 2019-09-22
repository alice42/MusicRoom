import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Alert } from 'react-native'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistsActions from '../actions/playlistsActions'
import * as errorActions from '../actions/errorActions'
import Search from '../components/searchContainer/Search'
import styles from '../styles/containers/HomeContainer'

class SearchContainer extends Component {
  test = track => {
    const { playlist, service } = this.props.navigation.state.params
    console.log("SERACH", service)
    if (service === '/mpe'){
      this.props.playlistsActions.addtrackToPlaylistMpe(track.id, playlist, service)
    }else if (service === '/mtv'){
      this.props.playlistsActions.addtrackToPlaylistMtv(track.id, playlist, service)
    }
    this.props.navigation.goBack()
  }
  alert = () => {
    return Alert.alert(
      'MUSICROOM',
      `${this.props.error.errorSearch}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.error.errorSearch ? this.alert() : null}
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
    playlistsActions: bindActionCreators(playlistsActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, search, playlist, events, error } = state
  return {
    user,
    events,
    search,
    playlist,
    error
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
