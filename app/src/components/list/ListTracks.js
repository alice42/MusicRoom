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
import * as userActions from '../../actions/userActions'
import * as searchActions from '../../actions/searchActions'
import * as playlistActions from '../../actions/playlistActions'
import { colors } from '../../constants/colors'
import ChoosePlaylistModal from '../playlist/ChoosePlaylistModal'
export default class Comments extends Component {
  render() {
    const { width } = Dimensions.get('window')
    const { list, buttonPlay, buttonAdd, buttonDel } = this.props
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
            <View
              style={{
                backgroundColor:
                  item.index % 2 ? colors.green02 : colors.green01,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomStyle: 'solid',
                borderBottomColor: 'black'
              }}
            >
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${track.album.cover}`
                  }}
                />
              </View>
              <View style={{ justifyContent: 'center', width: width - 170 }}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackTitle}>{track.artist.name}</Text>
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
                        marginRight: 20
                      }}
                    />
                  </TouchableOpacity>
                ) : null}
                {buttonAdd ? (
                  <ChoosePlaylistModalConnected
                    track={track}
                    navigation={this.props.navigation}
                    test={this.props.test}
                  />
                ) : buttonDel ? (
                  <TouchableOpacity
                    // onPress={() => this.props.playTrack(track.preview)}
                    style={{
                      justifyContent: 'center'
                    }}
                  >
                    <Icon
                      name="trash"
                      size={18}
                      style={{ color: colors.white }}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
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

const ChoosePlaylistModalConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ChoosePlaylistModal)

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
  }
})
