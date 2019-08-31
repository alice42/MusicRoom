import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../components/button/RoundedButton'
import styles from '../styles/containers/HomeContainer'
import * as playlistsActions from '../actions/playlistsActions'
import * as errorActions from '../actions/errorActions'
import ListPlaylists from '../components/list/ListPlaylists'
import { colors } from '../constants/colors'
import Loader from '../components/Loader'

const { height } = Dimensions.get('window')

class AllPlaylistsScreen extends Component {
  componentWillMount() {
    this.props.playlistsActions.getPlaylists()
  }

  handleDeletePlaylist = playlist => {
    this.props.playlistsActions.deletePlaylistRequest(playlist)
  }

  handleCreatePlaylist = name => {
    this.props.playlistsActions.createPlaylistRequest(name)
  }

  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate('CreatePlaylist', {
      handleCreatePlaylist: this.handleCreatePlaylist
    })
  }

  renderPlaylistslist = () => {
    const { list } = this.props.playlists
    return (
      <ListPlaylists list={list} handleDeletePlaylist={this.handleDeletePlaylist} {...this.props} />
    )
  }

  alert = () => {
    return Alert.alert(
      'MUSICROOM PLAYLISTS',
      `${this.props.error.errorPlaylists}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }

  render() {
    return this.props.playlists ? (
      <View style={styles.wrapper}>
        <View style={{ display: 'flex', flex: 1 }}>
          <Text style={stylesBis.heading}>ALL PLAYLISTS</Text>
          <View>
            <ScrollView style={{ backgroundColor: colors.gray03, height: height - 240 }}>
              {this.props.error.errorPlaylists ? this.alert() : null}
              {this.props.playlists.isFetching ? (
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
    ) : null
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    playlistsActions: bindActionCreators(playlistsActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function mapStateToProps(state) {
  const { playlist, error } = state
  return {
    playlists: playlist,
    error
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
