import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

class Details extends Component {
  displayDetailsKind = () => {
    const { DetailsKind } = this.props.navigation.state.params;
    if (DetailsKind) {
      return <Text>Details {DetailsKind}</Text>;
    }
  };
  render() {
    return <View>{this.displayDetailsKind()}</View>;
  }
}
export default Details;
