import axios from 'axios';
import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    firstname:'',
    lastname:''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
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
    .then((res)=>console.log(res))
    .catch(err=>console.log(err));

    setValues({
      username: '',
      email: '',
      password: '',
      password2: '',
      firstname:'',
      lastname:''
    });

    setIsSubmitting(true);
  };

  

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
