import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { colors } from "../../constants/colors";
import RoundedButton from "../button/RoundedButton";
import * as userActions from "../../actions/userActions";
import * as searchActions from "../../actions/searchActions";
import ListTracks from "../list/ListTracks";
import SearchBar from "../input/SearchBar";

class Search extends Component {
  renderSearchTracks = () => {
    const { results } = this.props.search;
    return <ListTracks list={results} buttons={true} />;
  };
  render() {
    return (
      <View>
        <SearchBarConnected />
        <View>
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

export default Search;
