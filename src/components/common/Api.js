const baseUrl = "http://todo.dev.api.iodatalabs.com/api"

export const Api = {
    getAllUsers:`${baseUrl}/v1/users/`,
    createUser:`${baseUrl}/v1/users`,
    loginUser:`${baseUrl}/v1/users/login`,
    createTodo:`${baseUrl}/v1/todos/`,
    todoList:`${baseUrl}/v1/todos/`,
    todoDetail:`${baseUrl}/v1/todos/`,
    deleteTodo:`${baseUrl}/v1/todos/`,
    updateTodo:`${baseUrl}/v1/todos/`,
    deleteCompleteTodos:`${baseUrl}/v1/todos/completed`
}