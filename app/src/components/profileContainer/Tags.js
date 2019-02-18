import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import TagButton from "../button/TagButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constants/colors";
import AddTagButton from "../button/AddTagButton";
import styles from "../../styles/containers/ProfileContainer";

export default class TagsView extends React.Component {
  state = {
    inputvalue: "",
    addNewTag: false
  };

  handleInput = text => {
    this.setState({ inputvalue: text });
  };

  onPressValidNewTag = () => {
    const { inputvalue } = this.state;
    const { tags } = this.props.update.user;
    const valueCheckRegex = /(?=.*[a-zA-Z])/;
    if (valueCheckRegex.test(inputvalue)) {
      tags.push(inputvalue);
      this.props.actions.updateRequest(tags, this.props.update.user, "tags");
    }
    this.setState({ inputvalue: "", addNewTag: false });
  };

  onPressDeleteTag = tag => {
    const { tags } = this.props.update.user;
    const index = tags.indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1);
    }
    this.props.actions.updateRequest(tags, this.props.update.user, "tags");
  };

  allTags() {
    return this.props.update.user.tags.map((tag, i) => {
      return (
        <TagButton
          onPressDeleteTag={() => {
            this.onPressDeleteTag(tag);
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
      <View>
        <View style={styles.tagsTitleWrapper}>
          <Text style={styles.tagsText}>Your music tastes</Text>
          <Icon style={styles.tagsIcon} name={"eye"} size={16} />
        </View>
        <ScrollView>
          <View style={styles.tagsContainer}>
            {this.allTags()}
            <AddTagButton
              inputvalue={inputvalue}
              addNewTag={addNewTag}
              handleInput={this.handleInput}
              onPressValidNewTag={this.onPressValidNewTag}
              onPressAdd={this.onPressAdd}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
