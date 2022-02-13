import React, { useState } from 'react';
import './Form.css';
import Form from './Form';
import FormSuccess from './FormSuccess';

const SignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='img/img-2.svg' alt='spaceship' />
        </div>
        {!isSubmitted ? (
          <Form submitForm={submitForm} />
        ) : (
          <FormSuccess title="회원가입이 완료되었습니다."/>
        )}
      </div>
    </>
  );
};

export default SignupForm;
