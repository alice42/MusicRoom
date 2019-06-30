import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import * as userActions from '../actions/userActions'
import ProfileHeader from '../components/profileContainer/ProfileHeader'
import ProfileContent from '../components/profileContainer/profileContent'
import { colors } from '../constants/colors'
import styles from '../styles/containers/ProfileContainer'

class ProfileContainer extends Component {
  render() {
    // console.log(this.props.user)
    return (
      <View style={styles.wrapper}>
        <ProfileHeaderConnected navigation={this.props.navigation} />
        <ProfileContentConnected navigation={this.props.navigation} />
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
