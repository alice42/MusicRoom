import React, { Component } from "react";
import { View, Text, Easing, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/input/RadioInput";

export default class RadioInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scaleCheckmarkValue: new Animated.Value(0)
    };

    this.scaleCheckmark = this.scaleCheckmark.bind(this);
  }

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
          styles.wrapperRadio
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
