import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { ListItem, List } from "react-native-elements";
import ListT from "../../constants/ListMenu";

class ListMenu extends Component {
  handler = item => {
    this.props.navigation.navigate("Details", {
      DetailsKind: item
    });
  };

  render() {
    return (
      <View>
        <List>
          {ListT.listMenu.map(item => (
            <ListItem
              key={item.title}
              title={item.title}
              // leftIcon={{ name: item.icon }}
              onPress={() => this.handler(item.title)}
            />
          ))}
        </List>
      </View>
    );
  }
}
export default withNavigation(ListMenu);
