import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./Styles";
import { Api } from "../common/Api";
import axios from "axios";

const SignInForm = (props) => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = {
      username: userName,
      password: password,
    };
    if(!userName || !password){
      alert("Please Enter username or password")
      return
    }
    try{
    const response = await axios.post(Api.loginUser, formData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response && response.data.payload) {
      localStorage.setItem("value", response.data.payload["auth-token"]);
      props.history.push("/");
    }
  }catch(err) {
    const errorMsg =  err.response && err.response.data.msg
    if(errorMsg === "invalid username." || "Invalid password"){
      alert(errorMsg)
    }
    else{
      alert("Something Went Wrong")
    }
  }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={4} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signin
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSignIn}
            method="post"
            data-testid="form"

          >
            <TextField
            error = {usernameError && !userName}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              data-testid="username"
              label="Username"
              name="Username"
              autoComplete="Username"
              value={userName}
              onFocus = {() => setUsernameError(true)}
              helperText={!userName && usernameError ? "Username is required" : null}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <TextField
             error = {passwordError && !password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              data-testid="password"
              autoComplete="current-password"
              value={password}
              onFocus = {() => setPasswordError(true)}
              helperText={!password && passwordError ? "Password is required" : null}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!(userName && password)}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
