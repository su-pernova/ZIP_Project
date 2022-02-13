import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [user, setUser]=useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const checkUser = () =>{
    const user = localStorage.getItem('user');
    console.log(user);
    if (user){
      setUser(user);
    }
    console.log(user);
  }

  useEffect(() => {
    showButton();
    checkUser();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            ZIP
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link
                  to='/curations'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Curations
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>
          {!user?
          (
            <Link to='/onboard'>
            <Button
              className='btn'
              buttonStyle='btn--primary'
              buttonSize='btn--medium'
            >시작하기
            </Button>
          </Link>
          ):(
            <Link
            to='/profile'
            className='nav-links nav-profile'
            onClick={closeMobileMenu}
            >
            <Avatar src="/broken-image.jpg" >
            {user}
            </Avatar>
            </Link>
          )
          }
      </nav>
    </>
  );
}

export default Navbar;
