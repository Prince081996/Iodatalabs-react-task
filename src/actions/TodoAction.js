import { Api } from "../components/common/Api";
import { errorHandler } from "../utility/ErrorHandler";
import {
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_ALL_COMPLETED_TODOS,
  GET_TODOS_LIST,
  GET_TODO_BY_ID,
} from "../types";
import  store  from "../store/store" 
import axios from "axios";


export const createTodo = async (data, token ) =>  {   
      try{
        const response = await axios.post(Api.createTodo,  data , {
            headers: { "Content-Type": "application/json", "auth-token": token },
          });
        } 
        catch (ex) {
            errorHandler(ex);
            return false;
    } 
}

export const todosList = async (data, token ) =>  {   
  alert(token)
    try{
      const response = await axios.get(Api.todoList , data,  {
          headers: { "Content-Type": "application/json", "auth-token": token },
        });
        store.dispatch({
            type:GET_TODOS_LIST,
            payload:response
        })
        return response
      } 
      catch (ex) {
          errorHandler(ex);
          return false;
  } 
}
