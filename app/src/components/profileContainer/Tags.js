import React from "react";
import { View } from "react-native";
import TagButton from "../button/TagButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constants/colors";
import AddTagButton from "../button/AddTagButton";
import styles from "../../styles/components/profileContainer/Tags";

export default class TagsView extends React.Component {
  state = {
    inputvalue: "",
    addNewTag: false
  };

  handleInput = text => {
    this.setState({ inputvalue: text });
  };

  onPressDeleteTag = tag => {
    this.props.onPressDeleteTag(tag);
  };

  onPressValidNewTag = () => {
    const { tags, inputvalue } = this.state;
    this.props.onPressValidNewTag(inputvalue);
    this.setState({ tags, inputvalue: "", addNewTag: false });
  };

  allTags() {
    return this.props.tags.map((tag, i) => {
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
      <View style={styles.container}>
        {this.allTags()}
        <AddTagButton
          inputvalue={inputvalue}
          addNewTag={addNewTag}
          handleInput={this.handleInput}
          onPressValidNewTag={this.onPressValidNewTag}
          onPressAdd={this.onPressAdd}
        />
      </View>
    );
  }
}
