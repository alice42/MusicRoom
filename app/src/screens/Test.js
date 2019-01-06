import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default class Test extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 20,
    marginVertical: 20
  }
});
