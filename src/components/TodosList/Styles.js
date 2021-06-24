import { makeStyles } from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    taskcontainer: {
      height: "600px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      backgroundColor: "#F6F7F8",
      padding: "40px 100px",
    },
    root: {
      width: "200px",
      marginTop: "2em",
      marginBottom: "2em",
      position: "relative",
      left: "4em",
    },
    deleteButton: {
      position: "relative",
      top: "2.5em",
      left: "2em",
    },
    button: {
      backgroundColor: "red",
      color: "white",
      fontSize: "1em",
      position: "relative",
      left: "5em",
      bottom: "0.5em",
      "&:hover": {
        background: "red",
      },
    },
    searchButton: {
      backgroundColor: "yellowgreen",
      color: "white",
      margin: "0 1em",
    },
    createTodoButton: {
      position: "relative",
      top: "2em",
      height: "40px",
      left: "5em",
      margin: "0 2em",
    },
    themeButton: {
      position: "relative",
      left: "4em",
      bottom: "3em",
      margin:"0 1em"
    },
    clear:{
        position:"relative",
        right:"1em"
    },
    page:{
      display:"flex",
      justifyContent:"center"
    },
    statButton:{
      position:"relative",
      left:"23em",
      top:"-3em"
    }
  }));
