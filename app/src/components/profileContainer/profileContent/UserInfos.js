import React from "react";
import { View, Text, StyleSheet } from "react-native";
import EditableInput from "../../../components/input/EditableInput";
import { colors } from "../../../constants/colors";
import styles from "../../../styles/containers/ProfileContainer";

export default class UserInfos extends React.Component {
  handleEmailEdit = email => {
    this.props.actions.updateRequest(email, this.props.user, "email");
  };

  handleNameEdit = name => {
    this.props.actions.updateRequest(name, this.props.user, "name");
  };

  handleFirstnameEdit = firstname => {
    this.props.actions.updateRequest(firstname, this.props.user, "firstname");
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.userInfosWrapper}>
        <View style={styles.userInfosLineWrapper}>
          <Text style={styles.userInfosKey}>Email : </Text>
          <EditableInput
            style={styles.userInfosValue}
            defaultValue={user.email}
            onChangeText={this.handleEmailEdit}
            size={12}
            type={"email"}
          />
        </View>
        <View style={styles.userInfosLineWrapper}>
          <Text style={styles.userInfosKey}>Name : </Text>
          <EditableInput
            style={styles.userInfosValue}
            defaultValue={user.name}
            onChangeText={this.handleNameEdit}
            size={12}
          />
        </View>
        <View style={styles.userInfosLineWrapper}>
          <Text style={styles.userInfosKey}>Firstname : </Text>
          <EditableInput
            style={styles.userInfosValue}
            defaultValue={user.firstname}
            onChangeText={this.handleFirstnameEdit}
            size={12}
          />
        </View>
      </View>
    );
  }
}
