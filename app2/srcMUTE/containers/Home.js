import React, { Component } from "react";
import { Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";

class Home extends Component {
  render() {
    return (
      <View>
        <Button style={styles.button} title="Remote 1" />
        <Button style={styles.button} title="Remote 2" />
        <Button style={styles.button} title="Remote 3" />
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  button: {
    marginTop: 15
  }
});
