import { Api } from "../components/common/Api";

import { GET_TODOS_LIST, GET_TODO_BY_ID } from "../types";
import store from "../store/store";
import axios from "axios";

export const getAllTodos = async (searchTerm, limit, page, SortBy, token) => {
  const params = {
    search: searchTerm,
    limit,
    page,
    sort_by: SortBy,
  };
  try {
    const response = await axios.get(Api.todoList, {
      params,
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    store.dispatch({
      type: GET_TODOS_LIST,
      payload: response.data,
    });
    return response;
  } catch (ex) {
    return false;
  }
};

export const getTodoById = async (id, token) => {
  try {
    const response = await axios.get(Api.todoDetail + `${id}`, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    store.dispatch({
      type: GET_TODO_BY_ID,
      payload: response.data,
    });
    return response;
  } catch (ex) {
    return false;
  }
};

