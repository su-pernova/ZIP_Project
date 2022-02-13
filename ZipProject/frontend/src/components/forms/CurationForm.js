import React, { useState } from 'react';
import './Form.css';
import CForm from './CForm';
import FormSuccess from './FormSuccess';

const CurationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className='form-container-2'>
        <span className='close-btn'>×</span>
        {!isSubmitted ? (
          <CForm submitForm={submitForm} />
        ) : (
          <FormSuccess title='큐레이션이 만들어졌습니다.'/>
        )}
      </div>
    </>
  );
};

export default CurationForm;
