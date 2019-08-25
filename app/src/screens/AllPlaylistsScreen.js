import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../components/button/RoundedButton'
import styles from '../styles/containers/HomeContainer'
import * as playlistsActions from '../actions/playlistsActions'
import ListPlaylists from '../components/list/ListPlaylists'
import { colors } from '../constants/colors'
import ApiError from '../components/ApiError'
import Loader from '../components/Loader'

// import playlist from '../mocks/mockPlaylist'
// import playlistTracks from '../mocks/mockplaylistTracks'

const { height } = Dimensions.get('window')

class AllPlaylistsScreen extends Component {
  state = {
    location: null
  }
  componentWillMount() {
    this.watchIDUser = navigator.geolocation.getCurrentPosition(position => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
      const location = region.latitude.toString().concat(' ', region.longitude.toString())
      this.setState({ location })
      this.props.playlistsActions.getPlaylists(location)
    })
  }

  handleDeletePlaylist = playlist => {
    const { location } = this.state
    this.props.playlistsActions.deletePlaylistRequest(playlist, location)
  }

  handleCreatePlaylist = name => {
    const { location } = this.state
    this.props.playlistsActions.createPlaylistRequest(name, location)
  }

  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate('CreatePlaylist', {
      handleCreatePlaylist: this.handleCreatePlaylist
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchIDUser)
  }

  renderPlaylistslist = () => {
    const { list } = this.props.playlists
    const { location } = this.state
    return (
      <ListPlaylists
        list={list}
        location={location}
        handleDeletePlaylist={this.handleDeletePlaylist}
        {...this.props}
      />
    )
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{ display: 'flex', flex: 1 }}>
          <Text style={stylesBis.heading}>ALL PLAYLISTS</Text>
          <View>
            <ScrollView style={{ backgroundColor: colors.gray03, height: height - 240 }}>
              {playlists.error ? (
                <ApiError
                  style={{ textAlign: 'center', marginTop: height / 2 - 100 }}
                  error={playlists.error}
                />
              ) : playlists.isFetching ? (
                <View style={{ marginTop: height / 2 - 170 }}>
                  <Loader />
                </View>
              ) : (
                this.renderPlaylistslist()
              )}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <RoundedButton
                text={'Create a new playlist'}
                textColor={colors.white}
                background={colors.green01}
                border={colors.white}
                icon={
                  <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                    <Icon name="music" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
                    <Icon name="plus" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
                  </View>
                }
                handleOnPress={this.handleCreatePlaylistRequest}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  }
}
function mapStateToProps(state) {
  const { playlist } = state
  return {
    playlists: playlist
  }
}

export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(AllPlaylistsScreen)

const stylesBis = StyleSheet.create({
  wrapper: {
    display: 'flex'
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.green01,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    marginBottom: 'auto',
    marginTop: 'auto'
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
