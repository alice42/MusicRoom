import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../actions/loginActions";

export default class SignUp extends Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };
  handleChangeUsername = username => {
    this.setState({ username });
  };
  handleChangePassword = password => {
    this.setState({ password });
  };

  handleSignUp = () => {
    const { email, password, username } = this.state;
    this.props.actions.signUpRequest(email, username, password);
  };

  render() {
    const { AppSignUp } = this.props;
    let error;
    if (AppSignUp.errorMessage !== "") {
      error = (
        <Text style={{ backgroundColor: "red" }}>{AppSignUp.errorMessage}</Text>
      );
    }
    return (
      <View>
        {error}
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={this.handleChangeEmail}
        />
        <Button name="envelope-o" title="Sign Up" onPress={this.handleSignUp} />
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
