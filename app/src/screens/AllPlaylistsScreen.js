import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native'
// import { colors } from '../constants/colors'
import styles from '../styles/containers/HomeContainer'
// import RadioInput from '../components/input/RadioInput'
// import RoundedButton from '../components/button/RoundedButton'
import * as userActions from '../actions/userActions'
import * as searchActions from '../actions/searchActions'
import * as playlistActions from '../actions/playlistActions'
import ListPlaylists from '../components/list/ListPlaylists'
// import Icon from 'react-native-vector-icons/FontAwesome'
import Playlists from '../components/homeContainer/Playlists'

class AllPlaylistsScreen extends Component {
  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate('CreatePlaylist', {
      handleCreatePlaylist: this.handleCreatePlaylist,
      type: 'playlist'
    })
  }

  componentWillMount() {
    const { playlists } = this.props.user.data
    this.props.playlistActions.setUserId(playlists[0].id)
  }

  handleCreatePlaylist = (title, collabOption, privacyOption) => {
    const { deezerToken, deezerId } = this.props.user
    console.log('collaborative', collabOption, 'privacyPublic', privacyOption)
    this.props.playlistActions.createPlaylist(title, deezerToken, deezerId)
  }

  renderPlaylists = () => {
    const { navigation } = this.props
    const { playlists } = this.props.user.data
    return (
      <ListPlaylists list={playlists} navigation={navigation} {...this.props} />
    )
  }
  apiError = () => {
    const { error } = this.props.user
    return <Text style={{ color: 'red' }}>{error}</Text>
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {/* {this.apiError()} */}
        {/* <View style={styles.containerWrapper}> */}
        <Playlists
          {...this.props}
          navigation={this.props.navigation}
          renderPlaylists={this.renderPlaylists}
          handleCreatePlaylistRequest={this.handleCreatePlaylistRequest}
        />
        {/* </View> */}
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
)(AllPlaylistsScreen)
