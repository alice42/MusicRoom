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
    editable: false
  };

  handleEdit = () => {
    const { editable } = this.state;
    if (!editable) {
      this.setState({ editable: true });
    } else {
      this.setState({ editable: false });
    }
  };

  onChangeText(text) {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }

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
          onChangeText={this.props.onChangeText}
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
