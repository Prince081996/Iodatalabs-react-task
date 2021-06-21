import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from  './Card'
import { Api } from "./common/Api";

const TodoDetail = (props) => {
  const { id } = useParams();
const useStyles = makeStyles(theme => ({
    cardDetail:{
        display:"flex",
        justifyContent:"center",
        margin:"2em 0 0 0"
    }
  }))
  const classes = useStyles()
 const [todoDetails, setTodoDetails] = useState({});
 const [token, setToken] = useState("")




  useEffect(() => {
    getTodoDetail()
 //eslint-disable-next-line 
  },[]);
//   const { title, description} = todoDetails

const getTodoDetail = async() => {  
  const token = localStorage.getItem("value")
  setToken(token)
  await axios.get(Api.todoDetail + `${id}`, {
    headers: { "Content-Type": "application/json", "auth-token": token },
  }).then((res) => {
      const responseTodo = res.data.payload;
      setTodoDetails(responseTodo)
  });
}

const deleteTask = async(id) => {
    const response = await axios.delete(Api.deleteTodo + `${id}`, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    // let tempList = taskList
    // tempList.splice(index, 1)
    // localStorage.setItem("taskList", JSON.stringify(tempList))
    // setTaskList(tempList)
    const deleteTodo = response && response.data.status 
    if(deleteTodo === "success") {
            props.history.push('/')
    }
    if(deleteTodo === "error") {
        alert("Something went Wrong")
    }
}


const updateListArray = async(obj, id) => {
    const response = await axios.put(Api.updateTodo + `${id}`, obj, {
        headers: { "Content-Type": "application/json", "auth-token": token },
      });
    const updateTodo = response && response.data.status
    if(updateTodo === "success") {
        window.location.reload()
    }
    if(updateTodo === "error") {
        alert("Something went Wrong")
    }

}

  return (
    <div>
        {todoDetails ? (
            <div>
      <h1>Todo Details</h1>
      <div className={classes.cardDetail}>
        <Card taskObj = {todoDetails} index = {id} detail="detail" deleteTask={deleteTask} updateListArray={updateListArray}/> 
     </div>
      </div>
        ) : (<CircularProgress />) }
    </div>
  );
}

export default TodoDetail;