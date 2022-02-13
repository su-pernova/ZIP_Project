import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          {/* <div className='footer-link-items'>
            <Link to='/sign-up'>ZIP</Link>
          </div>
          <div className='footer-link-items'>
            <Link to='/'>서비스 이용약관</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <Link to='/'>개인정보 처리방침</Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
