import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import thunk from "redux-thunk";
import TodoLists from "./components/TodoLists";
import reducers from './reducers'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import store from './store/store'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


// we change the palette type of the theme in state
function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <Router>
        <Routes />
      </Router>
      </Provider>
    </div>
  );
}


export default App;
