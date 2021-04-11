import React from "react";
import { Provider } from "react-redux";
import RootContainer from "./containers/root";
import store from "./store";
const App = () => {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
};

export default App;
