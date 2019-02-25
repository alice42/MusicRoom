import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/containers/HomeContainer";
import RadioInput from "../../components/input/RadioInput";
import RoundedButton from "../../components/button/RoundedButton";
import * as userActions from "../../actions/userActions";
import * as searchActions from "../../actions/searchActions";
import ListTracks from "../../components/list/ListTracks";
import Icon from "react-native-vector-icons/FontAwesome";
import Playlists from "../../components/homeContainer/Playlists";
import Events from "../../components/homeContainer/Events";
import SearchBar from "../../components/input/SearchBar";

class Search extends Component {
  renderSearchTracks = () => {
    const { results } = this.props.search;
    return <ListTracks list={results} />;
  };
  render() {
    return (
      <View>
        <SearchBarConnected />
        <View style={{}}>
          <Text>RESULTS</Text>
          <SafeAreaView>
            <ScrollView style={{ height: 180, marginBottom: 5 }}>
              {this.renderSearchTracks()}
            </ScrollView>
          </SafeAreaView>
        </View>
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

const SearchBarConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(SearchBar);

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Search);
