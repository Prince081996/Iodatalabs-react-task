import React, { useEffect, useState } from "react";
import { Api } from "./common/Api";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Card from "./Card";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import  {todosList } from '../actions/TodoAction'
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Pagination from "@material-ui/lab/Pagination";

function TodoLists({ onToggleDark }) {
  const [taskList, setTaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const [completed, setCompleted] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title.asc");
  const [limit, setLimit] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const [dark, setDark] = useState(false);

  //   let taskList = []
  const useStyles = makeStyles((theme) => ({
    taskcontainer: {
      height: "600px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "#F6F7F8",
      padding: "40px 100px",
    },
    root: {
      width: "200px",
      marginTop: "2em",
      marginBottom: "2em",
      position: "relative",
      left: "4em",
    },
    deleteButton: {
      position: "relative",
      top: "2.5em",
      left: "2em",
    },
    button: {
      backgroundColor: "red",
      color: "white",
      fontSize: "1em",
      fontWeight: "bold",
      position: "relative",
      left: "5em",
      bottom: "0.5em",
      "&:hover": {
        background: "red",
      },
    },
    searchButton: {
      backgroundColor: "yellowgreen",
      color: "white",
      margin: "0 1em",
    },
    createTodoButton: {
      position: "relative",
      top: "2em",
      height: "40px",
      left: "5em",
      margin: "0 2em",
    },
    themeButton: {
      position: "relative",
      left: "4em",
      bottom: "3em",
    },
    theme: {
      backgroundColor: dark ? "black" : "white",
    },
  }));

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
  ];

  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem("value");
    if (token) {
      setToken(token);
      getTodoLists();
    }
    // eslint-disable-next-line
  }, [token, page, sortBy]);

  useEffect(() => {
    console.log(localStorage.getItem("dark"))
    const theme = localStorage.getItem("dark");
    console.log(theme)
    if (theme == null) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dark", dark);
  }, [dark]);

  const getTodoLists = async (searchTerm) => {
    const response = await axios.get(Api.todoList, {
      params: {
        search: searchTerm,
        limit,
        page,
        sort_by: sortBy,
      },
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    if (response && response.data.status === "success") {
      const payload = response.data.payload;
      setPageCount(payload.total_pages);
      setPage(payload.page);
      setTaskList(payload.todos);
      // localStorage.setItem("taskList", obj)
    }
    
  };
  const handleSearch = () => {
    console.log("Test1", searchTerm);
    if (searchTerm) {
      getTodoLists(searchTerm);
    }
  };

  const deleteTodos = async () => {
    try {
      const response = await axios.delete(Api.deleteCompleteTodos, {
        headers: { "Content-Type": "application/json", "auth-token": token },
      });

      if (response && response.data.status === "success") {
        getTodoLists();
      }
    } catch (err) {
      alert("Something went wrong");
      console.log(err);
    }
  };

  const handleCreateTask = () => {
    window.location.href = "/create-todo";
  };

  const handleClear = () => {
    setSearchTerm("");
    getTodoLists();
  };

  return (
    <div className={classes.theme}>
      <h1>List Of Todos</h1>
      <input
        type="text"
        placeholder="searchtodo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ClearIcon onClick={() => handleClear()} />
      <Button
        className={classes.searchButton}
        onClick={handleSearch}
        disabled={!searchTerm}
      >
        SearchTodo
      </Button>
      {/* //   <Button onClick={handleSearch} disabled={!searchTerm}>SearchTodo</Button> */}
      <div className="filter">
        <FormControl
          variant="outlined"
          className={classes.root}
          style={{
            "background-color": colors[5 % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Filter Todo
          </InputLabel>
          <Select
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
            label="Filter Todo"
          >
            <MenuItem value={null}>
              <em>All</em>
            </MenuItem>
            <MenuItem value={false}>Active</MenuItem>
            <MenuItem value={true}>Completed</MenuItem>
          </Select>
        </FormControl>
        <span className={classes.createTodoButton}>
          <button className="btn btn-primary mt-2" onClick={handleCreateTask}>
            CreateTodo
          </button>
        </span>
        <FormControl
          variant="outlined"
          className={classes.root}
          style={{
            "background-color": colors[5 % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">SortBy</InputLabel>
          <Select
            value={""}
            onChange={(e) => setSortBy(e.target.value)}
            label="SortBy"
          >
            <MenuItem value={"title.asc"}>AscTitle</MenuItem>
            <MenuItem value={"title.desc"}>DescTitle</MenuItem>
            <MenuItem value={"description.desc"}>AscDescription</MenuItem>
            <MenuItem value={"description.desc"}>DescDescription</MenuItem>
          </Select>
        </FormControl>
        <span className={classes.deleteButton}>
          <Button className={classes.button} onClick={deleteTodos}>
            DeleteTodos
          </Button>
        </span>
        <Button
          className={classes.themeButton}
          variant="contained"
          color="default"
          onClick={() => setDark(!dark)}
        >
          Toggle Theme Type
        </Button>
      </div>
      <div className={`${classes.taskcontainer} ${classes.theme}`}>
        {taskList &&
          taskList
            .filter((todo) => completed === null || completed === todo.done)
            .map((obj, index) => (
              <Card
                taskObj={obj}
                index={index}
                getTodoLists={getTodoLists}
                dark={dark}
              />
            ))}
        <br />
        <Pagination
          count={pageCount}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </div>
    </div>
  );
}

export default TodoLists;
