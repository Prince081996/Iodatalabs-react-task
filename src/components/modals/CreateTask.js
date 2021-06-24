import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

const CreateTaskPopup = ({ modal, toggle, save }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const handleDateChange = (date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj["title"] = taskName;
    taskObj["description"] = description;
    taskObj["due_date"] = selectedDate;
    taskObj["priority"] = priority;
    taskObj["done"] = false;
    save(taskObj);
  };

  const handlePriority = (value) => {
    if(value === "low"){
      setPriority(0)
    }
    if(value === "medium"){
      setPriority(1)
    }
    else{
      setPriority(2)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Todo</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            maxLength={50}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            maxLength={250}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
        <div className="date-picker">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Select Due Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={selectedDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        <div className="form-group">
          <label>Enter Priority</label>
          <select id="cars" name="cars" onChange={(e) => handlePriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Create
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateTaskPopup;
