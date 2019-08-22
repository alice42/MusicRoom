import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native'
import { SwipeRow } from 'react-native-swipe-list-view'
import DeletePlaylistModal from '../playlist/DeletePlaylistModal'
import { colors } from '../../constants/colors'

const { width } = Dimensions.get('window')

export default class playlists extends Component {
  handleOnPressAccess = event => {
    this.props.navigation.navigate('Event', { event: event.id, location: this.props.location })
  }
  handleOnPressDelete = event => {
    this.props.handleDeleteEvent(event)
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
          const event = item.item
          return (
            <SwipeRow disableRightSwipe rightOpenValue={-55}>
              <View style={styles.standaloneRowBack}>
                <Text style={styles.backTextWhite}>Left</Text>
                <DeletePlaylistModal event={event} handleOnPressDelete={this.handleOnPressDelete} />
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
                  <Text style={styles.playlistTitle}>{event.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity onPress={() => this.handleOnPressAccess(event)}>
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
  name: {
    fontSize: 16,
    fontWeight: 'bold'
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
