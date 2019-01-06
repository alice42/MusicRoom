import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button
} from "react-native";
import { connect } from "react-redux";
import { increment, decrement } from "../actions/counterActions";
import { logout } from "../actions/loginActions";
import NavigationBar from "react-native-navbar";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { counter, user } = this.props;

    const titleConfig = {
      title: "Home",
      tintColor: "black"
    };

    const logoutButtonConfig = {
      title: "Logout",
      handler: () => {
        this.props.logout();
        this.props.navigation.navigate("Main");
      }
    };

    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor="#ADF8D1"
          rightButton={logoutButtonConfig}
        />
        <Text>{JSON.stringify(user)}</Text>
        <View style={styles.center}>
          <Text>Counter: {counter}</Text>
          <Button title="+" name="plus" onPress={this.props.increment} />
          <Button
            title="-"
            name="minus"
            background="red"
            onPress={this.props.decrement}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
    // alignItems: "center",
    // flexDirection: "row"
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    alignSelf: "center",
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1
  }
});

function mapStateToProps(state) {
  const { counter, user } = state;

  return {
    counter,
    user
  };
}

const actions = {
  increment,
  decrement,
  logout
};

export default connect(
  mapStateToProps,
  actions
)(HomeScreen);
