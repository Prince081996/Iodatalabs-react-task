import React, {useState, useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Api } from './common/Api'
import axios from "axios";
import { history } from './common/History';
// import Test from "./Test";
import { app } from '../firebase'


const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState("");  
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
//   const db = app.firestore();

  const handleSignUp = e => {
      debugger
      e.preventDefault()
    const formData = {
      "first_name":firstName,
      "last_name":lastName,
      "username":userName,
      "password":password,
      "avatar_url":profilePic
    }
    debugger
    const response =  axios.post(Api.createUser, formData
        ,{
        headers: { 'Content-Type': 'application/json' },
       }).then((res) => console.log(res)).catch((err) => {
           console.log(err)
        if (err && err.response) alert(err.msg);
      });
      console.log(response)
      debugger;
      if(response && response.status === "success"){
          history.push('/')
      }
      if(response && response.status === "error") {
          alert(response.msg)
      }
}

const onFileChange = async (e) => {
    const file = e.currentTarget.files[0];
    console.log(file)
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setProfilePic(await fileRef.getDownloadURL());

  };

  useEffect(() => {
    console.log(profilePic)
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignUp} method="post">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                {/* <Col>
            <Label>FirstName</Label>
                <Input value={firstName} data-testid="firstname-id" onChange={(e) => {setFirstName(e.target.value);}} type="text" placeholder="FirstName" />
                </Col> */}
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value);}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="Username"
                value={userName}
                onChange={(e) => {setUserName(e.target.value);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {setPassword(e.target.value);}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="profilepic"
                type="file"
                id="profilepic"
                autoComplete="profile-pic"
                onChange={(e) => {onFileChange(e)}}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
