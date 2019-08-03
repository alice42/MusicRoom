import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../../constants/colors'
import styles from '../../styles/components/input/EditableInput'

export default class EditableInput extends Component {
  state = {
    inputValue: this.props.defaultValue,
    editable: false,
    validValue: false
  }

  handleEdit = () => {
    const { editable, validValue, inputValue } = this.state
    const { defaultValue } = this.props
    if (!editable) {
      this.setState({ editable: true })
    } else {
      if (validValue) {
        this.props.onChangeText(inputValue)
        this.setState({ editable: false, inputValue })
      }
    }
  }

  onChangeText = text => {
    const { type } = this.props
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (type === 'email') {
      if (emailCheckRegex.test(text)) {
        this.setState({ validValue: true, inputValue: text })
      } else {
        this.setState({ validValue: false })
      }
    } else {
      if (valueCheckRegex.test(text)) {
        this.setState({ validValue: true, inputValue: text })
      } else {
        this.setState({ validValue: false })
      }
    }
  }

  render() {
    const { labelText, onChangeText, style, size } = this.props
    const { editable, inputValue } = this.state
    return (
      <View style={styles.wrapper}>
        <TextInput
          editable={editable}
          style={
            !editable
              ? [style, styles.text]
              : [
                  style,
                  styles.text,
                  styles.editableField,
                  {
                    marginTop: -5,
                    borderBottomColor: style.color
                  }
                ]
          }
          onChangeText={this.onChangeText}
          defaultValue={inputValue}
        />
        <TouchableOpacity onPress={this.handleEdit}>
          <Icon size={size} name={!editable ? 'edit' : 'check'} style={[styles.icon, { color: style.color }]} />
        </TouchableOpacity>
      </View>
    )
  }
}
