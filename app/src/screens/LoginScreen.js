import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Button
} from "react-native";
import NavigationBar from "react-native-navbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../actions/loginActions";
import Login from "../containers/Login";

class LoginScreen extends Component {
  componentDidUpdate = () => {
    const { isAuthenticated } = this.props;
    const { isGoogleAuthenticated } = this.props;
    const { isFacebookAuthenticated } = this.props;
    if (isAuthenticated || isGoogleAuthenticated || isFacebookAuthenticated)
      this.props.navigation.navigate("Home");
  };

  render() {
    const titleConfig = {
      title: "Login",
      tintColor: "black"
    };

    return (
      <View style={styles.container}>
        <NavigationBar title={titleConfig} tintColor="#ADF8D1" />
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = function(state) {
  const { user } = state;
  // console.log(state);
  return {
    isAuthenticated: user.user.isAuthenticated,
    isGoogleAuthenticated: user.google.isAuthenticated,
    isFacebookAuthenticated: user.facebook.isAuthenticated
  };
};

export default connect(mapStateToProps)(LoginScreen);
