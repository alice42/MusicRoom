import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { Card } from "react-native-elements";

export default class CardProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <View>
        <Card
          title={`${user.name}'s infos`}
          image={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
        >
          <View>
            {/* <Image resizeMode="cover" source={{ uri: u.avatar }} /> */}
            <Text>Name : {user.name}</Text>
            <Text>Email : {user.email}</Text>
          </View>
        </Card>
      </View>
    );
  }
}
