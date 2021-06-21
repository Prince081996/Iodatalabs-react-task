import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from 'moment';

const CreateTaskPopup = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(Number)
    let today = new Date()
    const [selectedDate, setSelectedDate] = useState(
        today
      );
    
      const handleDateChange = (date) => {
        setSelectedDate(moment(date).format('YYYY-MM-DD'));
      };


    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }

    }

    const handleSave = (e) => {
        e.preventDefault()
        let taskObj = {}
        taskObj["title"] = taskName
        taskObj[ "description"] = description
        taskObj["due_date"] = selectedDate
        taskObj[ "priority"] = priority
        taskObj["done"] = false
        save(taskObj)

    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div className = "form-group">
                        <label>Description</label>
                        <textarea rows = "5" className = "form-control" value = {description} onChange = {handleChange} name = "description"></textarea>
                    </div>
                    <div className="date-picker">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Select Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            minDate = {today }
                            KeyboardButtonProps={{
                                "aria-label": "change date"
                            }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    </div>
                    <div className = "form-group">
                        <label>Enter Priority</label>
                        <input type="number" className = "form-control" value = {priority} onChange = {(e) => setPriority(e.target.value)} name = "priority"/>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Create</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTaskPopup;