import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { Card, Avatar } from "react-native-elements";

export default class CardProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <View>
        <Card title={`${user.name}'s infos`}>
          {/* <View> */}

          <View style={{ flexDirection: "row" }}>
            <Avatar
              rounded
              medium
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
              }}
            />
            <View style={{ marginLeft: 15 }}>
              <Text>Name : {user.name}</Text>
              <Text>Email : {user.email}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}
