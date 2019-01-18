import React, { Component } from "react";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

class LogoutButton extends Component {
  onLogoutPress = () => {
    this.props.navigation.replace("LogIn");
  };

  render() {
    return (
      <Button
        color="#3D6DCC"
        backgroundColor="#fff"
        onPress={this.onLogoutPress}
        title="Log out"
        rightIcon={{ name: "sign-out", type: "font-awesome", color: "#3D6DCC" }}
      />
    );
  }
}
export default withNavigation(LogoutButton);
