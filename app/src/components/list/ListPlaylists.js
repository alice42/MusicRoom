import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, Dimensions } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import DeletePlaylistModal from '../playlist/DeletePlaylistModal'
import * as userActions from '../../actions/userActions'
import * as searchActions from '../../actions/searchActions'
import * as playlistActions from '../../actions/playlistActions'
import { colors } from '../../constants/colors'

const { width } = Dimensions.get('window')

export default class playlists extends Component {
  handleOnPressAccess = playlist => {
    const { deezerToken } = this.props.user
    this.props.playlistActions.setPlaylistTracks(playlist.id, deezerToken)
    this.props.navigation.navigate('Playlist', { playlist: playlist })
  }
  handleOnPressDelete = playlist => {
    const { deezerToken } = this.props.user
    this.props.playlistActions.deletePlaylist(playlist, deezerToken)
  }

  renderplaylists() {
    const { list } = this.props
    return (
      <FlatList
        style={styles.root}
        data={list}
        extraData={this.props}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
        keyExtractor={item => {
          return `${item.id}`
        }}
        renderItem={item => {
          const playlist = item.item
          return (
            <SwipeRow disableRightSwipe rightOpenValue={-55}>
              <View style={styles.standaloneRowBack}>
                <Text style={styles.backTextWhite}>Left</Text>
                <DeletePlaylistModal playlist={playlist} handleOnPressDelete={this.handleOnPressDelete} />
              </View>
              <View
                style={{
                  backgroundColor: item.index % 2 ? colors.green02 : colors.green01,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'black',
                  padding: 10
                }}
              >
                <View style={styles.container} />
                <View style={{ marginLeft: 40, width: width - 110 }}>
                  <Text style={styles.playlistTitle}>{playlist.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity onPress={() => this.handleOnPressAccess(playlist)}>
                    <Icon name={'chevron-right'} size={20} style={{ color: colors.white }} />
                  </TouchableOpacity>
                </View>
              </View>
            </SwipeRow>
          )
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>{this.renderplaylists()}</ScrollView>
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

// const DeletePlaylistModalConnected = connect(
//   profileMapStateToProps,
//   profileActionsMapDispatchToProps
// )(DeletePlaylistModal)

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    marginTop: 10
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flexDirection: 'row',
    flex: 1
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray04,
    marginTop: 2
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray04
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: '#808080'
  },
  playlistPrivacy: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.lightGray,
    marginTop: 4,
    marginLeft: 5
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: colors.darkOrange,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  backTextWhite: {
    color: '#FFF'
  }
})
