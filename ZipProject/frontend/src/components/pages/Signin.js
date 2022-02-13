import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1567016546367-c27a0d56712e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const loginUser =(credentials) =>{
    let form_data=new FormData();
    form_data.append('username',credentials.username)
    form_data.append('email',credentials.email)
    form_data.append('password',credentials.password)
    const response =axios
    .post('http://13.124.164.255/api/users/auth/login/', form_data, {
        headers:{
            'content-type':'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log(res)
        return res.data;
    })
    .catch(err=>console.log(err));
    return response
}

export default function Signin() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [key,setKey]=useState();

  const handleSubmit = async e => {
    e.preventDefault();
    let form_data=new FormData();
    form_data.append('username',username)
    form_data.append('email',email)
    form_data.append('password',password)
    axios
    .post('http://13.124.164.255/api/users/auth/login/', form_data, {
        headers:{
            'content-type':'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log(res);
        console.log(res.data)
        setKey(res.data);
        if ('key' in res.data) {
            swal("Success", '성공', "success", {
                buttons: false,
                timer: 5000,
            })
            localStorage.setItem('accessToken', res.data['key']);
            localStorage.setItem('user', username);
            window.location.href = "/";
        } else {
            swal("Failed", '실패', "error");
            setUserName('');
            setEmail('');
            setPassword('');
        }
    })
    .catch(err=>{
        console.log(err);
        swal("Failed", '실패', "error");
        setUserName('');
        setEmail('');
        setPassword('');
    });


  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="Username"
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}