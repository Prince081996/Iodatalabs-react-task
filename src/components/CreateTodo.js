import React, {useEffect, useState} from 'react';
import CreateTaskPopup from './modals/CreateTask';
import { connect } from "react-redux";
import { createTodo } from '../actions/TodoAction';
import store from 'redux'
import {Api} from './common/Api';
import axios from "axios";



const CreateTodo = ( props ) => {
  
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = async (taskObj) => {
        const token = localStorage.getItem("value")
        let tempList = taskList
        tempList.push(taskObj)
        createTodo(taskObj, token).then(res => {
            console.log(res)
        }).catch(err => {
            alert(err)
        })
        // const response = await axios.post(Api.createTodo, taskObj, {
        //     headers: { 'Content-Type': 'application/json', "auth-token" : token }
        // })

        // if(response && response.data.status === "success"){
        //     window.location.href = '/'
        // }
        // if(response && response.data.status === "error") {
        //     alert("Please fill all the required options")
        // }
        // console.log(response)
        setTaskList(taskList)
        setModal(false)
    }


    return (
        <>
            <div className = "header text-center">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
            </div>
            <CreateTaskPopup toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

// const mapStateToProps = ( store ) => {
//     return (
//         {
//             createTodos:store.TodoReducer.createTodoResponse
//         }
//     );
//   };

// export default connect(mapStateToProps,{ createTodo })(
//     CreateTodo
//   );

export default CreateTodo;
