import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./Styles";
import { Api } from "../common/Api";
import axios from "axios";

export default function SignUpForm(props) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const proflePic = "https://randomuser.me/api/portraits/men/23.jpg";
  const regExp = "^(?=.*[a-z])(?=.*[A-Z])[a-zA-Zd]{6,}$";

  const password_validate = (p) => {
    return p.match(regExp);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password: password,
      avatar_url: proflePic,
    };
    if (!password_validate(password)) {
      alert(
        "Password should be of minimum 6 characters and least one uppercase and one lowercase character."
      );
      return;
    }
    try {
      const response = await axios.post(Api.createUser, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response && response.data.status === "success") {
        alert("You Are Successfully registered! please login");
        props.history.push("/login");
      }
    } catch (err) {
      if (err.response.data.msg.includes("Duplicate entry")) {
        alert("Username already exist.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSignUp}
          method="post"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                   error = {firstNameError && !firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                data-testid="firstname"
                label="First Name"
                autoFocus
                value={firstName}
                onFocus = {() => setFirstNameError(true)}
                helperText={!firstName && firstNameError ? "Firstname is required" : null}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
               error = {lastNameError && !lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                data-testid="lastname"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onFocus = {() => setLastNameError(true)}
                helperText={!lastName && lastNameError ? "Lastname is required" : null}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               error = {usernameError && !userName}
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
               error = {passwordError && !password}
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!(userName && firstName && lastName && password)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
