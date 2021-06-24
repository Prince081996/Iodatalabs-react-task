import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
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
