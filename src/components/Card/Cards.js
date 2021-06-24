import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import EditTask from "../modals/EditTask";
import { useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { colors } from "../common/Colors";
import { useStyles } from "./Styles";
import axios from "axios";
import { Api } from "../common/Api";

const Card = ({
  taskObj,
  index,
  deleteTask,
  updateListArray,
  detail,
  getTodoLists,
  dark,
}) => {
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

  const completeTodo = async (id) => {
    const formData = {
      done: !taskObj.done,
    };
    const token = localStorage.getItem("value");
    const response = await axios.put(Api.updateTodo + `${id}`, formData, {
      headers: { "Content-Type": "application/json", "auth-token": token },
    });
    if (response && response.data && response.data.status === "success") {
      const completed = response.data.payload.done;
      getTodoLists();
      if (completed) {
        alert("Todo is Successfully completed");
        return;
      }
      if (!completed) {
        alert("You Marked Todo as Uncompleted");
      }
    }
  };

  return (
    <div
      className={`${classes.cardWrapper} ${
        detail === "detail" ? classes.cardWrapper2 : null
      }`}
    >
      <div
        className={classes.cardTop}
        style={{backgroundColor: colors[index % 5].primaryColor }}
      ></div>
      <div className={classes.taskholder}>
        <div className={classes.checkbox}>
          <FormControlLabel
            control={
              <Checkbox
                className={dark ? classes.forTheme : null}
                value="allowtodo"
                color="primary"
                onClick={() => completeTodo(taskObj.id)}
                checked={taskObj.done}
              />
            }
          />
        </div>
        <span
          className={classes.cardHeader}
          onClick={() => handleClick(taskObj.id)}
          style={{
            backgroundColor: colors[index % 5].secondaryColor,
            borderRadius: "10px",
          }}
        >
          Title
        </span>
        <span
          onClick={() => handleClick(taskObj.id)}
          className={classes.title}
          style={{ backgroundColor: dark ? "white" : "" }}
        >
          {taskObj.title}
        </span>
        {detail === "detail" ? (
          <>
            <span
              className={classes.cardHeader}
              onClick={() => handleClick()}
              style={{
                backgroundColor: colors[index % 5].secondaryColor,
                borderRadius: "10px",
              }}
            >
              Description
            </span>
            <p
              className="mt-3"
              style={{ backgroundColor: dark  ? "white" : null }}
            >
              {taskObj.description}
            </p>
          </>
        ) : null}

        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
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
        taskObj={taskObj}
      />
    </div>
  );
};

export default Card;
