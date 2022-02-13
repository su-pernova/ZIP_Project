import React, { useState , useEffect} from 'react';
import validateInfo from '../forms/validateInfo';
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
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=867&q=80)',
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


export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    firstname:'',
    lastname:''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors(validateInfo(values));
    let form_data=new FormData();
    form_data.append('username',values.username);
    form_data.append('email',values.email);
    form_data.append('password1',values.password);
    form_data.append('password2',values.password2);
    form_data.append('first_name',values.firstname);
    form_data.append('last_name',values.lastname);

    axios
    .post('http://13.124.164.255/api/users/auth/register/', form_data, {
        headers:{
            'content-type':'multipart/form-data'
        }
    })
    .then((res)=>{
        console.log(res);
        console.log(res.data)
        if ('key' in res.data) {
            swal("Success", '성공', "success", {
                buttons: false,
                timer: 5000,
            })
            window.location.href = "/sign-in";
        } else {
            swal("Failed", '실패', "error");
            setValues({
              username: '',
              email: '',
              password: '',
              password2: '',
              firstname:'',
              lastname:''
            });
        }
    })
    .catch(err=>{
        console.log(err);
        swal("Failed", '실패', "error");
    });
  }

  useEffect(
    () => {
      if (Object.keys(errors).length === 0) {
      }
      setValues({
        username: '',
        email: '',
        password: '',
        password2: '',
        firstname:'',
        lastname:''
      });
    },
    [errors]
  );


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
            Sign Up
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
              onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              name="password2"
              label="Password2"
              type="password"
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              name="lastname"
              label="Lastname"
              onChange={handleChange}
            />
            {errors.lastname && <p>{errors.lastname}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              name="firstname"
              label="Firstname"
              onChange={handleChange}
            />
            {errors.firstname && <p>{errors.firstname}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
          <div>
            <span>이미 계정이 있다면? </span>
            <Link to='/sign-in'>
            <span>Login</span>
            </Link>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}