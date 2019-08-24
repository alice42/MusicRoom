import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import ChoosePlaylistModal from '../playlist/ChoosePlaylistModal'
import DeletePlaylistModal from '../playlist/DeletePlaylistModal'
import * as userActions from '../../actions/userActions'
import * as searchActions from '../../actions/searchActions'
import * as playlistsActions from '../../actions/playlistsActions'
import { colors } from '../../constants/colors'

export default class Comments extends Component {
  render() {
    const { width } = Dimensions.get('window')
    const { list, buttonPlay, buttonAdd, buttonDel, playlist, mtv } = this.props
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
          const track = item.item
          return (
            <SwipeRow disableRightSwipe rightOpenValue={-55}>
              <View style={styles.standaloneRowBack}>
                <Text style={styles.backTextWhite}>Left</Text>
                {/* {buttonDel ? (
                  <DeletePlaylistModal
                    playlist={playlist ? playlist : track}
                    toDelTrack={track}
                    handleOnPressDelete={this.props.handleOnPressDelete}
                  />
                ) : null} */}
              </View>
              <View
                style={{
                  backgroundColor: item.index % 2 ? colors.green02 : colors.green01,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'black'
                  // paddingLeft: 20
                }}
              >
                <View style={styles.container}>
                  {mtv ? (
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text
                        style={{
                          color: colors.white,
                          alignSelf: 'center',
                          fontWeight: '600'
                        }}
                      >
                        {track.numberOfVote}
                      </Text>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.handleVote(track, 1)}>
                          <Icon
                            name="plus"
                            size={18}
                            style={{
                              color: colors.white,
                              marginRight: 20,
                              marginTop: 'auto',
                              marginBottom: 'auto'
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.handleVote(track, -1)}>
                          <Icon
                            name="minus"
                            size={18}
                            style={{
                              color: colors.white,
                              // marginRight: 20
                              marginTop: 'auto',
                              marginBottom: 'auto'
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  <Image
                    style={styles.image}
                    source={
                      track.albumCover
                        ? {
                            uri: `${track.albumCover}`
                          }
                        : null
                    }
                  />
                </View>
                <View style={{ justifyContent: 'center', width: width - 180 }}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  <Text style={styles.trackTitle}>{track.artistName}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  {buttonPlay ? (
                    <TouchableOpacity
                      // onPress={() => this.props.playTrack(track.preview)}
                      style={{
                        justifyContent: 'center'
                      }}
                    >
                      <Icon
                        name="play"
                        size={18}
                        style={{
                          color: colors.white,
                          marginLeft: -20
                        }}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {buttonAdd ? (
                    <TouchableOpacity onPress={() => this.props.test(track)}>
                      <Icon
                        name="plus"
                        size={18}
                        style={{
                          color: colors.white,
                          marginLeft: 20
                        }}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </SwipeRow>
          )
        }}
      />
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

// const ChoosePlaylistModalConnected = connect(
//   profileMapStateToProps,
//   profileActionsMapDispatchToProps
// )(ChoosePlaylistModal)

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff'
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
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
