import React, { Component } from "react";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/SettingsContainer";

export default class SettingsContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Text style={styles.heading}>Settings</Text>
        </View>
      </View>
    );
  }
}
