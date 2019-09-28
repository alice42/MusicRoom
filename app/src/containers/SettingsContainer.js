import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, View, ScrollView } from 'react-native'
import * as userActions from '../actions/userActions'
import * as errorActions from '../actions/errorActions'
import styles from "../styles/containers/SettingsContainer";
import Tagsfriends from '../components/profileContainer/profileContent/Tagsfriends'
import Networks from '../components/profileContainer/profileContent/Networks'

class SettingsContainer extends Component {
  alert = () => {
    return Alert.alert(
      'MUSICROOM',
      `${this.props.error.errorUser}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }
  render() {
    return (
        <ScrollView style={styles.wrapper}>
        <View style={styles.containerWrapper}>
        {/* {this.props.error.errorUser ? this.alert() : null} */}
        <Tagsfriends {...this.props} />
        <Networks {...this.props} />
      </View>
      </ScrollView>
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

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(SettingsContainer)
