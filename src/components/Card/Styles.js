import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    width: "270px",
    height: "200px",
    boxShadow: "0px 3px 20px #A5A5A5",
    display: "flex",
    flexDirection: "column",
    marginRight: "20px",
  },
  cardWrapper2: {
    width: "285px",
    height: "350px",
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
    top: "-4em",
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
    right: "4em",
  },
  title: {
    position: "relative",
    left: "2em",
    width: "200px",
  },
  icons: {
    position: "relative",
    top: "3em",
  },
  forTheme: {
    position: "relative",
    right: "1.3em",
  },
}));
