import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import UserInfos from './UserInfos'
import Tags from './Tags'
import Networks from './Networks'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class ProfileContent extends React.Component {
  render() {
    return (
      <View>
        <UserInfos {...this.props} />
        <Tags {...this.props} />
        <Networks {...this.props} />
      </View>
    )
  }
}
