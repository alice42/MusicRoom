import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import AppReducer from "./src/reducers/AppReducer";
import AppWithNavigationState from "./src/navigation/AppNavigator";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./src/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(
  AppReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState
          navigation={{
            dispatch: this.props.dispatch,
            state: this.props.nav
          }}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("App", () => App);

export default App;
