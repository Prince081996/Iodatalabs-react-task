import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles(theme => ({
    root: {
      height: "80vh",
      position:"relative",
      top:"5em",
      right:"28em",
    
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));