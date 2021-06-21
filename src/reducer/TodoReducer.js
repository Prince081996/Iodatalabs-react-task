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

const initialState = {
  todos: [],
  todosLoading: true,
  todosPostError: undefined,
  todosPosting: true,
};

const todoReducer =  (state = initialState, action) => {
  console.log("REDUCER_: ", [action.type, action.payload]);
  switch (action.type) {
    case GET_TODOS_LIST:
      return {
        ...state,
        todosLoading: true,
        todosList:action.payload
      }; 
    default:
        return {
          ...state,
          todosPostError: action.payload,
        };
  }
};

export default todoReducer
