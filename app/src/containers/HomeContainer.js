import React, { Component } from "react";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";

export default class HomeContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Text style={styles.heading}>Welcome</Text>
        </View>
      </View>
    );
  }
}
