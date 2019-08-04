import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'
import NextArrowButton from '../components/button/NextArrowButton'
import * as userActions from '../actions/userActions'
import Icon from 'react-native-vector-icons/FontAwesome'

class HomeContainer extends Component {
  onPlaylistsPress = () => {
    this.props.navigation.navigate('AllPlaylists')
  }
  onEventsPress = () => {
    this.props.navigation.navigate('AllEvents')
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Text style={styles.heading}>Welcome to MusicRoom</Text>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.green01,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30
            }}
          >
            <Text style={[styles.title, { color: colors.green02, marginTop: 45 }]}>PLAYLISTS</Text>
            <View style={{ marginTop: 110 }}>
              <NextArrowButton
                handleOnPress={this.onPlaylistsPress}
                color={colors.green01}
                background={colors.green02}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.green02,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30
            }}
          >
            <Text style={[styles.title, { color: colors.green01, marginTop: 45 }]}>EVENTS</Text>
            <View style={{ marginTop: 110 }}>
              <NextArrowButton
                handleOnPress={this.onEventsPress}
                color={colors.green02}
                background={colors.green01}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user } = state
  return {
    user
  }
}
export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(HomeContainer)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  containerWrapper: {
    paddingTop: 80,
    flex: 1,
    marginTop: 30,
    padding: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    paddingBottom: 30,
    color: colors.green01,
    textAlign: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    paddingLeft: 20,
    paddingBottom: 20
  }
})
