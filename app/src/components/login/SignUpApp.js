import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../actions/loginActions";

export default class SignUp extends Component {
  example = () => {};
  render() {
    return (
      <View>
        <TextInput style={styles.input} placeholder="email" />
        <TextInput style={styles.input} placeholder="username" />

        <TextInput style={styles.input} placeholder="password" />

        <Button name="envelope-o" title="Sign Up" onPress={this.example} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    height: 44,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  }
});
