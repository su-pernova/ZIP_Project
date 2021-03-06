import React, { useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import validateInfo from '../forms/validateInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import axios from 'axios';
import {  Checkbox, FormControlLabel } from '@material-ui/core';

import SecondOnboard from '../component/SecondOnboard';
import ThirdOnboard from '../component/ThirdOnboard';
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

const FirstOnboard =({nextShow, setIndex}) =>{

    const classes = useStyles();
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        firstname:'',
        lastname:'',
        nickname:'',
        profile_image:'',
      });
    const [errors,setErrors]=useState({});
    const [stage, setStage]=useState(1);

    const nextStage =(stage) =>{
      setStage(stage);
    }
    const prevStage =() =>{
      setStage(stage-1);
    }
    const render =() =>{
      switch(stage){
          case 1:
              return Signin()
          case 2:
              return <SecondOnboard nextStage={nextStage} prevStage={prevStage} handleChange={handleChange} handleImageChange={handleImageChange} setIndex={setIndex}/>
          case 3:
              return <ThirdOnboard nextStage={nextStage} prevStage={prevStage} handleChange ={handleChange} handleRecommenderAxios={handleRecommenderAxios} handleSubmit={handleSubmit}/>
          default:
              return <div>γγ΄λΌγ</div>
      }
  }
  
    const Signin =() =>{
      return(
        <form className={classes.form} noValidate >
        <Grid container spacing={2}>
          <Grid item xs= {12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              name="lastname"
              label="μ΄λ¦"
              onChange={handleChange}
            />
            {errors.lastname && <p>{errors.lastname}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            name="firstname"
            label="μ±"
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="μμ΄λ"
            onChange={handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </Grid>
          <Grid item xs={12}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="μ΄λ©μΌ μ£Όμ"
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </Grid> 
          <Grid item xs={12}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="λΉλ°λ²νΈ"
              type="password"
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>} 
          </Grid>
          <div className="onboard-password-desc">
            <div>* μλ¬Έ/μ«μ/νΉμλ¬Έμ 2κ°μ§ μ΄μ μ‘°ν©(8~20μ)</div>
            <div>* 3κ° μ΄μ μ°μλκ±°λ(abc, 123)λμΌν λ¬Έμ/μ«μ μ¬μ© λΆκ°</div>
          </div>
          <Grid item xs={12}>
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password2"
              name="password2"
              label="λΉλ°λ²νΈ μ¬μλ ₯"
              type="password"
              onChange={handleChange}
            />
            {errors.password2 && <p>{errors.password2}</p>}
          </Grid>
        </Grid>
        <FormControlLabel label="ZIPμ μ΄μ©μ½κ΄κ³Ό κ°μΈμ λ³΄ μ²λ¦¬λ°©μΉ¨μ λͺ¨λ λμν©λλ€." control={<Checkbox/>} />
        <Button
          onClick={()=>{
              nextStage(2)
              setIndex(1)
          }}
          fullWidth
          variant="contained"
          className="onboard-btn">
          λ€μμΌλ‘
      </Button>
      </form>
      )
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
        console.log(name, value)
      };

    const handleImageChange = (file)=>{
        setValues({
            ...values,
            profile_image :file
        })
        console.log('profile_image', values.profile_image);
    }
    const handleRecommenderAxios= async(request, user,key)=>{
      
      const request_data={
      target_user:user,
      curations:request.curations,
      curation_tags:request.curation_tags,
      products:request.products,
      product_tags:request.product_tags
    }
    console.log(request_data);
    axios
    .post('http://13.124.164.255/api/recommender/add/',JSON.stringify(request_data),{
      headers:{
        'content-type':'application/json',
      }
    })
    .then((res)=>{
      if(key){
        swal("Success", 'μ±κ³΅', "success", {
          buttons: false,
        })
        localStorage.setItem('accessToken', key);
        localStorage.setItem('user', user);
        window.location.href="/";
      }
    })
    .catch((err)=>{
      console.log(err);
      alert('μ€ν¨νμ΅λλ€.')
    })
    }

    const handleSubmit = async (request) => {
        setErrors(validateInfo(values));
        let form_data=new FormData();
        form_data.append('username',values.username);
        form_data.append('email',values.email);
        form_data.append('password1',values.password);
        form_data.append('password2',values.password2);
        form_data.append('first_name',values.firstname);
        form_data.append('last_name',values.lastname);
        form_data.append('nickname ',values.nickname);
        form_data.append('profile_image',values.profile_image);
        
        // form_data.append('profile_image',values.profile_image);
    
        axios
        .post('http://13.124.164.255/api/users/auth/register/', form_data, {
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>{
            const user=values.username;
            setValues({
              username: '',
              email: '',
              password: '',
              password2: '',
              firstname:'',
              lastname:'',
              nickname:'',
              profile_image:'',
            });
            const key=res.data['key'];
            handleRecommenderAxios(request,user,key);
          }
        )
        .catch(err=>{
            setValues({
              username: '',
              email: '',
              password: '',
              password2: '',
              firstname:'',
              lastname:'',
              nickname:'',
              profile_image:'',
            });
            console.log(err);
            swal("Failed", 'μ€ν¨', "error",{
              buttons:false,
              timer:5000,
            });
            window.location.href = "/";
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
        lastname:'',
        nickname:'',
        profile_image:'',
      });
    },
    [errors]
  );

  return(
      <div>
        <div>
        {stage==1&&(
          <>
            <div className="onboard-title">
              νμκ°μ
              <div className="onboard-subtitle">κ°μνμ  κ³μ μ΄ μμΌμ κ°μ? 
                <a onClick={()=>nextShow(2)} className="highlight">λ‘κ·ΈμΈ</a>
            </div>
            </div>
          </>
        )}
        </div>

        {render()}
      </div>
  )

    
}
export default FirstOnboard;