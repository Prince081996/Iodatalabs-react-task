import { combineReducers } from "redux";
import todoReducer from "./TodoReducer";

 const reducers =  combineReducers({
    todoReducer:todoReducer
})
export default reducers