import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export default class RoundedButton extends Component {
  render() {
    const {
      text,
      textColor,
      background,
      icon,
      handleOnPress,
      border
    } = this.props;
    const backgroundColor = background || "transparent";
    const color = textColor || colors.black;
    const borderColor = border || "transparent";

    return (
      <TouchableOpacity
        style={[{ backgroundColor }, { borderColor }, styles.wrapper]}
        onPress={handleOnPress}
      >
        <View style={styles.buttonTextWrapper}>
          {icon}
          <Text style={[{ color }, styles.buttonText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 15,
    alignItems: "center"
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%",
    textAlign: "center"
  }
});
