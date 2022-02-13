import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Curations from './components/pages/Curations';
import ProductCategory from './components/pages/ProductCategory';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import CurationDetail from './components/pages/CurationDetail';
import ProductDetail from './components/pages/ProductDetail';
import Signin from './components/pages/Signin';
import Profile from './components/pages/Profile';
import Onboard from './components/pages/Onboard';


function App() {

  return (
    <>
      <Router>
        <Navbar />
          <Route path='/' exact component={Home} />
          <Route path='/curations' component={Curations} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/curation-detail/:id' component={CurationDetail} />
          <Route path='/product-category/:category' component={ProductCategory} />
          <Route path='/product-detail/:id' component={ProductDetail} />
          <Route path='/sign-in' component={Signin} />
          <Route path='/profile' component={Profile} />
          <Route path='/onboard' component={Onboard} /> 
      </Router>
    </>
  );
}

export default App;
