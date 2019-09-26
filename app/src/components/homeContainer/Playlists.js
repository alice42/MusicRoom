import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  ScrollView
} from 'react-native'
import { colors } from '../../constants/colors'
import styles from '../../styles/containers/HomeContainer'
import RoundedButton from '../button/RoundedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/MaterialIcons'

export default class HomeContainer extends Component {
  handleAddTrack = () => {
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.subHeading}>Your playlists</Text>
        <ScrollView style={{ backgroundColor: colors.gray03 }}>
          {this.props.renderPlaylists()}
        </ScrollView>
        <View style={{ marginTop: 10 }}>
          <RoundedButton
            text={'Create a new playlist'}
            textColor={colors.white}
            background={colors.green01}
            border={colors.white}
            icon={
              <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                <Icon
                  name="music"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
                <Icon
                  name="plus"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
              </View>
            }
            handleOnPress={this.props.handleCreatePlaylistRequest}
          />
          <RoundedButton
            text="Add tracks"
            textColor={colors.white}
            background={colors.green01}
            border={colors.white}
            icon={
              <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
                <Icons
                  name="queue-music"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
                <Icon
                  name="plus"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
              </View>
            }
            handleOnPress={this.handleAddTrack}
          />
        </View>
      </View>
    )
  }
}
