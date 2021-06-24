import React, { useEffect, useState } from "react";
import { Api } from "../common/Api";
import axios from "axios";
import Card from "../Card/Cards";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Pagination from "@material-ui/lab/Pagination";
import { colors } from "../common/Colors";
import { useStyles } from "./Styles";
import { getAllTodos } from "../../actions/TodoAction";

function TodoLists(props) {
  const [taskList, setTaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const [completed, setCompleted] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title.asc");
  const [pageCount, setPageCount] = useState(1);
  const [dark, setDark] = useState(false);
  const classes = useStyles();
  const limit = 4;

  useEffect(() => {
    getTodoLists();
    // eslint-disable-next-line
  }, [token, page, sortBy]);

  useEffect(() => {
    localStorage.setItem("dark", "dark");
  }, [dark]);

  const getTodoLists = async (searchTerm) => {
    const token = localStorage.getItem("value");
    setToken(token);
    try {
      const response = await getAllTodos(
        searchTerm,
        limit,
        page,
        sortBy,
        token
      );
      if (response && response.data.status === "success") {
        const payload = response.data.payload;
        localStorage.setItem("todos", JSON.stringify(payload.todos));
        setPageCount(payload.total_pages);
        setPage(payload.page);
        setTaskList(payload.todos);
      }
    } catch (err) {
      alert("Something Went Wrong");
    }
  };
  const handleSearch = () => {
    if (searchTerm) {
      getTodoLists(searchTerm);
    }
  };

  const deleteCompletedTodos = async () => {
    try {
      const response = await axios.delete(Api.deleteCompleteTodos, {
        headers: { "Content-Type": "application/json", "auth-token": token },
      });
      if (response && response.data.status === "success") {
        getTodoLists();
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  const handleCreateTask = () => {
    props.history.push("/create-todo");
  };

  const handleClear = () => {
    setSearchTerm("");
    getTodoLists();
  };

  const handleLogout = () => {
    localStorage.removeItem("value");
    localStorage.removeItem("todos");
    localStorage.removeItem("dark");
    props.history.push("/login");
  };

  const handleStatsScreen = () => {
    props.history.push("/stat-screen");
  };

  return (
    <div style={{ backgroundColor: dark ? "black" : "white" }}>
      <h1 style={{ backgroundColor: colors[5 % 5].primaryColor }}>
        Todos List
      </h1>
      <input
        type="text"
        placeholder="searchtodo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ClearIcon
        style={{ position: "relative", right: "1em" }}
        onClick={() => handleClear()}
      />
      <Button
        className={classes.searchButton}
        onClick={handleSearch}
        disabled={!searchTerm}
      >
        SearchTodo
      </Button>
      <div className="filter">
        <FormControl
          variant="outlined"
          className={classes.root}
          style={{
            backgroundColor: colors[5 % 5].secondaryColor,
            borderRadius: "10px",
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
            backgroundColor: colors[5 % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
          <Select
            value={sortBy}
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
          <Button className={classes.button} onClick={deleteCompletedTodos}>
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
        <Button
          className={classes.themeButton}
          variant="contained"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <div className={classes.statButton}>
          <Button
            variant="contained"
            color="default"
            className={classes.themeButton}
            onClick={() => handleStatsScreen()}
          >
            StatScreen
          </Button>
        </div>
      </div>
      <div
        className={classes.taskcontainer}
        style={{ backgroundColor: dark ? "black" : "white" }}
      >
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
      </div>
      <Pagination
        className={classes.page}
        count={pageCount}
        page={page}
        onChange={(e, val) => setPage(val)}
        color="primary"
      />
    </div>
  );
}

export default TodoLists;
