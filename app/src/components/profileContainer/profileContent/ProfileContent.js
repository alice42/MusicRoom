import React from 'react'
import { View } from 'react-native'
import Tags from './Tags'
import Tagsfriends from './Tagsfriends'

export default class ProfileContent extends React.Component {
  render() {
    return (
      <View style={{marginTop: 20}}>
        <Tags {...this.props} />
        <Tagsfriends {...this.props} />
      </View>
    )
  }
}
