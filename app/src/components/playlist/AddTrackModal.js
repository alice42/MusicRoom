import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../../constants/colors";
import * as userActions from "../../actions/userActions";
import * as searchActions from "../../actions/searchActions";
import Icon from "react-native-vector-icons/FontAwesome";
import Search from "../playlist/Search";

class AddTrackModal extends Component {
  state = {
    modalVisible: false
  };
  handleOpenAddTrackModal = () => {
    this.setState({ modalVisible: true });
  };
  handleCloseAddTrackModal = () => {
    this.setState({ modalVisible: false });
  };
  handleOpenAddTrackModal = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={{ marginTop: 50 }}>
            <SearchConnected />
            <TouchableOpacity onPress={this.handleCloseAddTrackModal}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={this.handleOpenAddTrackModal}>
          <Text>ADD TRACKS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  const { user, search } = state;
  return {
    user,
    search
  };
}

const SearchConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Search);

export default AddTrackModal;
