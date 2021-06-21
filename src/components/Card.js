import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "font-awesome/css/font-awesome.min.css";
import EditTask from "./modals/EditTask";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import {Api} from "./common/Api"



const Card = ({ taskObj, index, deleteTask, updateListArray, detail, getTodoLists, dark }) => {
  // const { title, description, id, done } = taskObj;
  // console.log(taskObj);
  const useStyles = makeStyles((theme) => ({
    cardWrapper: {
      width: "270px",
      height: "200px",
      boxShadow: "0px 3px 20px #A5A5A5",
      display: "flex",
      flexDirection: "column",
      marginRight: "20px",
    },
    cardWrapper2:{
        width:"285px",
        height:"350px"
    },
    cardTop: {
      width: "100%",
      height: "2%",
    },
    taskholder: {
      width: "100%",
      height: "98%",
      padding: "10px 10px",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      top:"-4em"
    },
    cardHeader: {
      marginTop: "10px",
      marginBottom: "10px",
      height: "30px",
      padding: "1px 1px !important",
      textAlign: "center",
      cursor: "pointer",
    },
    checkbox: {
        display: "inline-block",
        position: "relative",
        top: "5.6em",
        right: "4em"
    },
    title:{
        position: "relative",
        left: "2em",
        width: "200px",
        color:dark ? "white" : ""
    },
    icons:{
        position:"relative",
        top:"3em"
    }

  }));

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const [modal, setModal] = useState(false);
  const classes = useStyles();
  let history = useHistory();

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj, id) => {
    updateListArray(obj, id);
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  const handleClick = (id) => {
    history.push(`/todo-detail/${id}`);
  };

  const completeTodo = async(id) => {
      const formData = {
          "done":!taskObj.done
      }
    const token = localStorage.getItem("value")
    const response = await axios.put(Api.updateTodo + `${id}`, formData , {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    if(response && response.data.status === "success") {
        getTodoLists()
      alert("Todo is Successfully updated")
    }
  }

  return (
    <div className={classes.cardWrapper}>
      <div
        className={classes.cardTop}
        style={{ "background-color": colors[index % 5].primaryColor }}
      ></div>
      <div className={classes.taskholder}>

          <div className={classes.checkbox}>
              <FormControlLabel
                control={<Checkbox value="allowtodo" color="primary" onClick={() => completeTodo(taskObj.id)} checked={taskObj.done} />}
              />
            </div>
        <span
          className={classes.cardHeader}
          onClick={() => handleClick(taskObj.id)}
          style={{
            "background-color": colors[index % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          Title
        </span>
        <span className={ classes.title}>{taskObj.title}</span>
        {detail === "detail" ? (
            <>
              <span
              className={classes.cardHeader}
              onClick={() => handleClick()}
              style={{
                "background-color": colors[index % 5].secondaryColor,
                "border-radius": "10px",
              }}
            >
              Description
            </span>
          <p className="mt-3">{taskObj.description}</p>
          </>
        ) : null}

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          {/* <i class = "far fa-edit mr-3" style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {() => setModal(true)}></i> */}
          {detail === "detail" ? (
            <>
              {" "}
              <DeleteIcon
              className={classes.icons}
                style={{
                  color: colors[index % 5].primaryColor,
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(taskObj.id)}
              />{" "}
              <EditIcon
              className={classes.icons}
                style={{
                  color: colors[index % 5].primaryColor,
                  cursor: "pointer",
                }}
                onClick={() => setModal(true)}
              />{" "}
            </>
          ) : null}
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj = {taskObj} 
              />
    </div>
  );
};

export default Card;
