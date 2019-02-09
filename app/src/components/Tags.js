import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import TagButton from "./button/TagButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import AddTagButton from "./button/AddTagButton";
import styles from "../styles/components/Tags";

export default class TagsView extends React.Component {
  state = {
    tags: this.props.all,
    inputvalue: "",
    addNewTag: false
  };

  handleInput = text => {
    this.setState({ inputvalue: text });
  };

  onPress = tag => {
    var { tags } = this.state;
    var index = tags.indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1);
    }
    this.setState({ tags });
  };

  onPressValid = () => {
    var { tags, inputvalue } = this.state;
    const valueCheckRegex = /(?=.*[a-zA-Z])/;
    if (valueCheckRegex.test(inputvalue)) {
      tags.push(inputvalue);
      this.setState({ tags, inputvalue: "", addNewTag: false });
    } else {
      this.setState({ tags, inputvalue: "", addNewTag: false });
    }
  };

  allTags() {
    const { tags } = this.state;
    return tags.map((tag, i) => {
      return (
        <TagButton
          onPress={() => {
            this.onPress(tag);
          }}
          key={i}
          title={tag}
        />
      );
    });
  }

  onPressAdd = () => {
    this.setState({ addNewTag: true });
  };

  render() {
    const { inputvalue, addNewTag } = this.state;
    return (
      <View style={styles.container}>
        {this.allTags()}
        <AddTagButton
          inputvalue={inputvalue}
          addNewTag={addNewTag}
          handleInput={this.handleInput}
          onPressValid={this.onPressValid}
          onPressAdd={this.onPressAdd}
        />
      </View>
    );
  }
}
