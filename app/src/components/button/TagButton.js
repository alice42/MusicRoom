import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors'
import styles from '../../styles/components/button/TagsButtons'

export default class BackgroundButton extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Text style={this.props.allowedUsers ? stylesBis.text : styles.text}>
          {this.props.title}
        </Text>
        <TouchableOpacity style={styles.touchable} onPress={this.props.onPressDeleteTag}>
          <Icon name="close" size={20} style={{ color: colors.white }} />
        </TouchableOpacity>
      </View>
    )
  }
}

const stylesBis = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    maxWidth: 300
  }
})
