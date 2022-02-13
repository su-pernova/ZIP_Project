import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const undefined =  () =>{
  alert("개발중인 서비스 입니다!")
}

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='top-container'>
        <div className='title-section'>
          <h1>🛌 ZIP에서 🛋 당신의 🏠을 꾸며봐요 🛌</h1>
        </div>
        <div id='serach' class='serach_area'>
              <input
                className='serach-input'
                placeholder='원하는 상품과 큐레이션을 검색해보세요!'
              />
              <Button onClick={undefined} buttonStyle='btn--primary'>검색</Button>
          </div>
        <div className='hero-btns'>
          <Link to='/curations'>
            <Button
              buttonStyle='btn--primary'
              buttonSize='btn--large'
            >
            큐레이션 보러가기
            </Button>
          </Link>
          <Link to='/products'>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
          상품 보러가기
          </Button>
          </Link>
          </div>
      </div>
    </div>
  );
}

export default HeroSection;
