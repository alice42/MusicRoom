import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Alert } from 'react-native'
import * as userActions from '../actions/userActions'
import * as errorActions from '../actions/errorActions'
import ProfileHeader from '../components/profileContainer/ProfileHeader'
import ProfileContent from '../components/profileContainer/profileContent'
import { colors } from '../constants/colors'
import styles from '../styles/containers/ProfileContainer'

class ProfileContainer extends Component {
  alert = () => {
    return Alert.alert(
      'MUSICROOM',
      'an error occured',
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }
  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.error.errorUser ? this.alert() : null}
        <ProfileHeaderConnected navigation={this.props.navigation} />
        <ProfileContentConnected navigation={this.props.navigation} />
      </View>
    )
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, events, error } = state
  return {
    user,
    events,
    error
  }
}

const ProfileHeaderConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileHeader)

const ProfileContentConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContent)

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContainer)
