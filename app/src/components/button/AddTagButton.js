import React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors'
import styles from '../../styles/components/button/TagsButtons'

export default class AddTagButton extends React.Component {
  render() {
    const { addNewTag, allowedUsers } = this.props
    return (
      <View style={styles.addContainer}>
        <TouchableOpacity onPress={this.props.onPressAdd}>
          <Icon name="plus" size={20} style={{ color: colors.green01 }} />
        </TouchableOpacity>
        {addNewTag ? (
          <View style={styles.view}>
            <TextInput
              style={allowedUsers ? stylesBis.text : styles.text}
              placeholder={allowedUsers ? "friend's mail" : 'Your new tag'}
              onChangeText={this.props.handleInput}
            />
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPressValidNewTag}>
              <Icon name="check" size={20} style={{ color: colors.white }} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    )
  }
}

const stylesBis = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    maxWidth: 250
  }
})
