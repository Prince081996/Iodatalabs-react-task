import React, { useEffect, useState } from "react";
import CreateTaskPopup from "../modals/CreateTask";
import { Api } from "../common/Api";
import { colors } from "../common/Colors";
import axios from "axios";

const CreateTodo = (props) => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("dark");
    if(typeof(theme) === "boolean")
    setDark(theme);
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const saveTodo = async (taskObj) => {
    const token = localStorage.getItem("value");
    if (token) {
      try {
        const response = await axios.post(Api.createTodo, taskObj, {
          headers: { "Content-Type": "application/json", "auth-token": token },
        });
        if (response && response.data.status === "success") {
          setTaskList(taskList);
          setModal(false);
          props.history.push("/");
        }
      } catch (err) {
        const error = err.response.data.msg;
        if (error === "Date should be greater than today") {
          alert(error);
        } else {
          alert("Something Went Wrong");
        }
      }
    }
  };

  return (
    <>
      <div
        className="header text-center"
        style={{ backgroundColor: dark ? "black" : "white" }}
      >
        <h3 style={{ backgroundColor: colors[5 % 5].primaryColor }}>
          Add Todo
        </h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Todo
        </button>
      </div>
      <CreateTaskPopup toggle={toggle} modal={modal} save={saveTodo} />
      <div
        style={{
          height: dark ? "550px" : null,
          backgroundColor: dark ? "black" : "white",
        }}
      ></div>
    </>
  );
};

export default CreateTodo;
