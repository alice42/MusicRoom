import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PrivacyModal from './PrivacyModal'
import EditableInput from '../../../components/input/EditableInput'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class UserInfos extends React.Component {
  handleEmailEdit = email => {
    const { token } = this.props.user
    this.props.actions.updateRequest(token, 'email', email)
  }

  handleNameEdit = name => {
    const { token } = this.props.user
    this.props.actions.updateRequest(token, 'name', name)
  }

  handleFirstnameEdit = firstname => {
    const { token } = this.props.user
    this.props.actions.updateRequest(token, 'firstname', firstname)
  }

  render() {
    const { email, name, firstname } = this.props.user.data
    // console.log(this.props.user)
    return (
      <View>
        <View style={styles.contentProfileTitleWrapper}>
          <Text style={styles.contentProfileText}>Your infos</Text>
          <PrivacyModal />
        </View>
        <View style={styles.contentProfileWrapper}>
          <View style={styles.userInfosWrapper}>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Email : </Text>
              <EditableInput style={styles.userInfosValue} defaultValue={email} onChangeText={this.handleEmailEdit} size={12} type={'email'} />
            </View>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Name : </Text>
              <EditableInput style={styles.userInfosValue} defaultValue={name} onChangeText={this.handleNameEdit} size={12} />
            </View>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Firstname : </Text>
              <EditableInput style={styles.userInfosValue} defaultValue={firstname} onChangeText={this.handleFirstnameEdit} size={12} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
