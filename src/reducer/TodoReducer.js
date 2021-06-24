import { GET_TODOS_LIST, GET_TODO_BY_ID } from "../types";

const initialState = {
  todos: [],
  todosLoading: true,
  todosPostError: undefined,
  todosPosting: true,
};

const todoReducer = (state = initialState, action) => {
  const payload = action.payload && action.payload.payload;
  switch (action.type) {
    case GET_TODOS_LIST:
      return {
        ...state,
        todos: payload.todos,
        todosLoading: true,
      };
    case GET_TODO_BY_ID:
      return {
        ...state,
        todos: action.payload,
        todosLoading: true,
      };
    default:
      return {
        ...state,
        todosPostError: action.payload,
      };
  }
};

export default todoReducer;
