import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getTodoById } from "../actions/TodoAction";
import Card from "./Card/Cards";
import { colors } from "./common/Colors";
import { Api } from "./common/Api";


const TodoDetail = (props) => {
  const { id } = useParams();
  const useStyles = makeStyles((theme) => ({
    cardDetail: {
      display: "flex",
      justifyContent: "center",
      margin: "2em 0 0 0",
    },
  }));
  const classes = useStyles();
  const [todoDetails, setTodoDetails] = useState({});
  const [token, setToken] = useState("");
  const [dark, setDark] = useState(false)
 
  useEffect(() => {
    getTodoDetail();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("dark");
    setDark(theme)
  }, [dark]);

  const getTodoDetail = async () => {
    const token = localStorage.getItem("value");
    setToken(token);
    try{
    const response = await getTodoById(id, token)
     const responseTodo = response.data.payload;
      setTodoDetails(responseTodo);
      }
      catch(err) {
      alert("Something Went Wrong")
    }
  };

  const deleteTask = async (id) => {
    const response = await axios.delete(Api.deleteTodo + `${id}`, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    const deleteTodo = response && response.data.status;
    if (deleteTodo === "success") {
      alert("You have Successfully deleted todo")
      props.history.push("/");
    }
    if (deleteTodo === "error") {
      alert("Something went Wrong");
    }
  };

  const updateListArray = async (obj, id) => {
    const response = await axios.put(Api.updateTodo + `${id}`, obj, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    const updateTodo = response && response.data.status;
    if (updateTodo === "success") {
      alert("You have Successfully updated todo")
      window.location.reload();
    }
    if (updateTodo === "error") {
      alert("Something went Wrong");
    }
  };

  return (
    <div style={{ backgroundColor: dark === true ? "black" : "" }}>
      {todoDetails ? (
        <div>
          <h1 style={{ backgroundColor: colors[5 % 5].primaryColor }}>Todo Details</h1>
          <div className={classes.cardDetail}>
            <Card
              taskObj={todoDetails}
              index={id}
              detail="detail"
              deleteTask={deleteTask}
              updateListArray={updateListArray}
              dark={dark}
            />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
      <div style={{ backgroundColor: dark === true ? "black" : "white", height: dark === true  ? "300px" :null}} ></div>
    </div>
  );
};

export default TodoDetail;
