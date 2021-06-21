import reducers from "../reducer/TodoReducer";
import { createStore } from "redux";

const store = createStore(
    reducers
  );

export default store  