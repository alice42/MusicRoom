import React from "react";
import { Text } from "react-native";

import Colors from "../../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Text
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={
          this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
        }
      />
    );
  }
}
