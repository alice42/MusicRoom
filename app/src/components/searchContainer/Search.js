import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import * as userActions from "../../actions/userActions";
import * as searchActions from "../../actions/searchActions";
import ListTracks from "../list/ListTracks";
import SearchBar from "../input/SearchBar";

class Search extends Component {
  renderSearchTracks = () => {
    const { results } = this.props.search;
    return (
      <ListTracks
        list={results}
        buttons={true}
        navigation={this.props.navigation}
        test={this.props.test}
      />
    );
  };
  apiError = () => {
    const { error } = this.props.user;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };
  render() {
    return (
      <View>
        {this.apiError()}
        <View>
          <SearchBarConnected />
        </View>
        <View>
          <Text>RESULTS</Text>
          <SafeAreaView>
            <ScrollView>{this.renderSearchTracks()}</ScrollView>
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

export default Search;
