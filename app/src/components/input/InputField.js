import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, TextInput } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/input/InputField";

export default class InputField extends Component {
  state = {
    inputValue: this.props.defaultValue
  };

  onChangeText = text => {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  };
  render() {
    const {
      placeholder,
      labelText,
      onChangeText,
      defaultValue,
      secureTextEntry
    } = this.props;
    const { inputValue } = this.state;
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{labelText}</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={this.onChangeText}
          placeholder={placeholder}
          defaultValue={inputValue}
          value={inputValue}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  }
}
