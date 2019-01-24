import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { colors } from "../constants/colors";

export default class InputField extends Component {
  render() {
    const { placeholder, labelText } = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{labelText}</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    marginBottom: 30
  },
  label: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "700",
    color: colors.white
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
    color: colors.white,
    borderBottomColor: colors.white
  },
  showButton: {
    position: "absolute",
    right: 0
  },
  showButtonText: {
    color: colors.white,
    fontWeight: "700"
  },
  checkmarkWrapper: {
    position: "absolute",
    right: 0,
    bottom: 12
  }
});
