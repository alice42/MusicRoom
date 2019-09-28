import React from 'react'
import { View } from 'react-native'
import Tags from './Tags'
import UserInfos from './UserInfos'

export default class ProfileContent extends React.Component {
  render() {
    return (
      <View style={{marginTop: 20}}>
        <UserInfos {...this.props} />
        <Tags {...this.props} />
      </View>
    )
  }
}
