import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/button/RoundedButton";

export default class RoundedButton extends Component {
  render() {
    const {
      text,
      textColor,
      background,
      icon,
      handleOnPress,
      border,
      disable
    } = this.props;
    const backgroundColor = background || "transparent";
    const color = textColor || colors.black;
    const borderColor = border || "transparent";
    const isDisable = disable || false;
    return (
      <TouchableOpacity
        style={[{ backgroundColor }, { borderColor }, styles.wrapper]}
        onPress={handleOnPress}
        disabled={isDisable}
      >
        <View style={styles.buttonTextWrapper}>
          {icon}
          <Text style={[{ color }, styles.buttonText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
