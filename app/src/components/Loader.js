import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '../constants/colors'

export default class Loader extends React.Component {
  render() {
    return (
      <View style={[stylesT.container, stylesT.horizontal]}>
        <Text style={{ color: colors.green02, textAlign: 'center', padding: 10 }}>Loading...</Text>
        <ActivityIndicator size="large" color={colors.green02} />
      </View>
    )
  }
}

const stylesT = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  }
})
