import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { colors } from "../../constants/colors";

export default class EditableField extends Component {
  state = {
    inputValue: this.props.defaultValue,
    editable: false,
    validValue: false
  };

  handleEdit = () => {
    const { editable, validValue, inputValue } = this.state;
    if (!editable) {
      this.setState({ editable: true });
    } else {
      if (validValue) {
        this.setState({ editable: false });
        this.props.onChangeText(inputValue);
      } else {
        this.setState({ inputValue: this.props.defaultValue });
        this.setState({ editable: false });
      }
    }
  };

  onChangeText = text => {
    const valueCheckRegex = /(?=.*[a-zA-Z])/;
    if (valueCheckRegex.test(text)) {
      this.setState({ validValue: true, inputValue: text });
    } else {
      this.setState({ validValue: false, inputValue: text });
    }
  };

  render() {
    const { labelText, onChangeText, defaultValue, style, size } = this.props;
    const { inputValue, editable } = this.state;
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
                  { marginTop: -5, borderBottomColor: style.color }
                ]
          }
          onChangeText={this.onChangeText}
          defaultValue={inputValue}
        />
        <TouchableOpacity onPress={this.handleEdit}>
          <Icon
            size={size}
            name={!editable ? "edit" : "check"}
            style={[styles.icon, { color: style.color }]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row"
  },
  text: {
    marginRight: 8
  },
  icon: {
    marginTop: 6
  },
  editableField: {
    borderBottomWidth: 1
  }
});
