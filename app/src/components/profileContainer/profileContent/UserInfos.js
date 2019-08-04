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

  handlePrivacy = (privacyValue, dataType) => {
    const { token } = this.props.user
    this.props.actions.updatePrivacyRequest(token, privacyValue, dataType)
  }

  render() {
    const { email, name, firstname, privacy } = this.props.user.data
    const emailPrivacy = this.props.user.data.privacy.email
    const namePrivacy = this.props.user.data.privacy.name
    const firstnamePrivacy = this.props.user.data.privacy.firstname
    return (
      <View>
        <View style={styles.contentProfileTitleWrapper}>
          <Text style={styles.contentProfileText}>Your infos</Text>
        </View>
        <View style={styles.contentProfileWrapper}>
          <View style={styles.userInfosWrapper}>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Email : </Text>
              <EditableInput
                style={styles.userInfosValue}
                defaultValue={email}
                onChangeText={this.handleEmailEdit}
                size={12}
                type={'email'}
              />
              <PrivacyModal
                dataType={'email'}
                onChangePrivacy={this.handlePrivacy}
                dataPrivacy={emailPrivacy}
              />
            </View>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Name : </Text>
              <EditableInput
                style={styles.userInfosValue}
                type={'text'}
                defaultValue={name}
                onChangeText={this.handleNameEdit}
                size={12}
              />
              <PrivacyModal
                dataType={'name'}
                onChangePrivacy={this.handlePrivacy}
                dataPrivacy={namePrivacy}
              />
            </View>
            <View style={styles.userInfosLineWrapper}>
              <Text style={styles.userInfosKey}>Firstname : </Text>
              <EditableInput
                style={styles.userInfosValue}
                type={'text'}
                defaultValue={firstname}
                onChangeText={this.handleFirstnameEdit}
                size={12}
              />
              <PrivacyModal
                dataType={'firstname'}
                onChangePrivacy={this.handlePrivacy}
                dataPrivacy={firstnamePrivacy}
              />
            </View>
          </View>
        </View>
      </View>
    )
  }
}
