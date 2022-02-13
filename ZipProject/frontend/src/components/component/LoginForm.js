import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '60%',
        margin: '0 auto',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));

const LoginForm =({prevShow}) =>{
    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        password: '',
      });

    
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        let form_data=new FormData();
        form_data.append('username',values.username)
        form_data.append('password',values.password)
        axios
        .post('http://13.124.164.255/api/users/auth/login/', form_data, {
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
                localStorage.setItem('accessToken', res.data['key']);
                localStorage.setItem('user', values.username);
                window.location.href = "/";
            } else {
                swal("Failed", '실패', "error");
                setValues({
                    username: '',
                    password: '',
                });
            }
        })
        .catch(err=>{
            console.log(err);
            swal("Failed", '실패', "error");
            setValues({
                username: '',
                password: '',
            });
        });
    
      }


    return (
        <>
        <div className="onboard-title">
            로그인
            <div className="onboard-subtitle">계정이 없으신가요 ?
                <a onClick={prevShow} className="highlight"> 회원가입</a>
            </div>
        </div>
         <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              label="아이디"
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="비밀번호"
              type="password"
              onChange={handleChange}
            />


            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="onboard-btn"
            >
              로그인
            </Button>
          </form>
        </>
    )
}

export default LoginForm;
