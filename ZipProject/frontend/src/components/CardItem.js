import React from 'react';
import { Link } from 'react-router-dom';
import {BsBookmark} from 'react-icons/bs'

import BookMarkProduct from './component/BookMarkProduct';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link' >
          <Link to={props.path}>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
              />
          </figure>
            </Link>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <div className="cards__item__user__cat">{props.user} {'>'} {props.label}</div>
            <BookMarkProduct image={props.src} user={props.user} id={props.id}/>
          </div>
        </div>
      </li>
    </>
  );
}

export default CardItem;
