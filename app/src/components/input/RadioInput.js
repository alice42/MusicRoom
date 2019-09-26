import React, { Component } from "react";
import { View, Easing, Animated, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class RadioInput extends Component {
  state = {
    scaleCheckmarkValue: new Animated.Value(0)
  };

  scaleCheckmark(value) {
    Animated.timing(this.state.scaleCheckmarkValue, {
      toValue: value,
      duration: 400,
      easing: Easing.easeOutBack
    }).start();
  }

  render() {
    const {
      selected,
      iconColor,
      selectedBackgroundColor,
      selectedBorderColor,
      backgroundColor,
      borderColor
    } = this.props;
    const background = selected ? selectedBackgroundColor : backgroundColor;
    const border = selected ? selectedBorderColor : borderColor;

    const iconScale = this.state.scaleCheckmarkValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.01, 1.6, 1]
    });

    const scaleValue = selected ? 1 : 0;
    this.scaleCheckmark(scaleValue);

    return (
      <View
        style={[
          { backgroundColor: background, borderColor: border },
          styles.wrapper
        ]}
      >
        <Animated.View
          style={[{ transform: [{ scale: iconScale }] }, styles.iconWrapper]}
        >
          <Icon name="md-checkmark" color={iconColor} size={20} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  iconWrapper: {
    marginTop: 2
  }
});
