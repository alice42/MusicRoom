import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";
import EditableInput from "../input/EditableInput";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/list/ListEditableInfos";

export default class ListEditableInfos extends Component {
  state = {
    defaultValue: null
  };

  handleInfoEdit = text => {
    this.setState({ defaultValue: text });
  };

  renderListings = () => {
    const { list } = this.props;
    const { defaultValue } = this.state;
    return Object.keys(list).map((info, index) => (
      <View key={`list-${index}`} style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listKey}>{info} : </Text>
        </View>
        <View style={{ flex: 1 }}>
          <EditableInput
            style={styles.listValue}
            defaultValue={defaultValue ? defaultValue : list[info]}
            onChangeText={this.handleInfoEdit}
            size={12}
          />
        </View>
      </View>
    ));
  };
  render() {
    return <View style={styles.wrapper}>{this.renderListings()}</View>;
  }
}
