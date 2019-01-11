import React, { Component } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import * as loginActions from "../../actions/loginActions";

export default class Login extends Component {
  state = {
    email: "user@gmail.com",
    password: "user"
  };

  handleChangeEmail = email => {
    this.setState({ email });
  };

  handleChangePassword = password => {
    this.setState({ password });
  };

  loginEmail = () => {
    const { email, password } = this.state;
    this.props.actions.loginRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    const { loginApp } = this.props;
    const titleConfig = {
      title: "Login",
      tintColor: "black"
    };

    let error;
    if (loginApp.errorMessage !== "") {
      error = (
        <Text style={{ backgroundColor: "red" }}>{loginApp.errorMessage}</Text>
      );
    }

    return (
      <View>
        {error}
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={this.handleChangeEmail}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={this.handleChangePassword}
          secureTextEntry={true}
          value={password}
        />

        <Button name="envelope-o" title="Login" onPress={this.loginEmail} />
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
