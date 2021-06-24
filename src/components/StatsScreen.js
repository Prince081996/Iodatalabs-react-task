import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
const StatsScreen = (props) => {
  const allTodos = props.todos;
  const completedTodos =
    allTodos && allTodos.filter((todo) => todo.done === true);
  const completedTodosPercentage =
    ((completedTodos && completedTodos.length) /
      (allTodos && allTodos.length)) *
    100;
  const activeTodosPercentage = 100 - completedTodosPercentage;

  const state = {
    labels: ["Active Tasks", "Completed Tasks"],
    datasets: [
      {
        backgroundColor: ["#B21F00", "#C9DE00"],
        hoverBackgroundColor: ["#501800", "#4B5000"],
        data: [activeTodosPercentage, completedTodosPercentage],
      },
    ],
  };

  return (
    <div
      style={{
        height: "400px",
        width: "400px",
        position: "relative",
        left: "32em",
      }}
    >
      <Pie
        data={state}
        options={{
          title: {
            display: true,
            text: "User Active and Completed Todos Ratio",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps)(StatsScreen);
