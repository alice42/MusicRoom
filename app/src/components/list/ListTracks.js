import React, { Component } from 'react'
import DeleteTrackModal from '../playlist/DeleteTrackModal'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import { colors } from '../../constants/colors'
const { width, height } = Dimensions.get('window')
export default class Comments extends Component {
  handleOnPressDelete = track => {
    this.props.handleDeleteTrack(track)
  }
  render() {
    const { width, height } = Dimensions.get('window')
    const { list, buttonPlay, buttonAdd, mtv, canEdit } = this.props
    return (
      list.length === 0 ? 
      <View style={styles.viewNoEvent}>
        <Text style={styles.textNoEvent}>No tracks</Text>
      </View>
      :
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
          const cover = track.albumCover || track.album.cover
          return (
            <SwipeRow disableRightSwipe disableLeftSwipe={canEdit ? false: true} rightOpenValue={-55}>
              <View style={styles.standaloneRowBack}>
                <Text style={styles.backTextWhite}>Left</Text>
                <DeleteTrackModal
                  event={list.id}
                  track={track}
                  handleOnPressDelete={this.handleOnPressDelete}
                />
              </View>
              <View
                style={{
                  backgroundColor: item.index % 2 ? colors.green02 : colors.green01,
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'black'
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
                              marginTop: 'auto',
                              marginBottom: 'auto'
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : null}
                  <Image style={styles.image} source={{ uri: `${cover}` }} />
                </View>
                <View style={{ justifyContent: 'center', width: width - 180 }}>
                  <Text style={styles.trackTitle}>{track.title}</Text>
                  {buttonPlay ? (
                    <Text style={styles.trackTitleName}>{track.artistName}</Text>
                  ) : (
                    <Text style={styles.trackTitleName}>{track.artist.name}</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  {buttonPlay ? (
                    <TouchableOpacity
                      onPress={() => this.props.play(item.index, track, list)}
                      style={{
                        justifyContent: 'center'
                      }}
                    >
                      <Icon
                        name="play"
                        size={18}
                        style={{
                          color: colors.white,
                          marginLeft: 15
                        }}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {buttonAdd ? (
                    <TouchableOpacity
                      onPress={() => this.props.test(track)}
                      style={{
                        justifyContent: 'center'
                      }}
                    >
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

const styles = StyleSheet.create({
  // root: {
  //   backgroundColor: '#ffffff'
  // },
  viewNoEvent:{
    width: width,
    height: height,
    padding: 70,
    alignItems: 'center',
  },
  textNoEvent: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.green01,
    marginTop: 2
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
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
  trackTitle: {
    color: colors.white,
    fontSize: 16
  },
  trackTitleName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
