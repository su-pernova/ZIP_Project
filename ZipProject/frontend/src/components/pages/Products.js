import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../../App.css';
import {Tabs,Tab} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


import ProductCards from '../ProductCards';
import ProductAdd from './ProductAdd';


// csrf token 설정
// django의 기본 셋팅에 맞추어 axios 통신의 기본 cookiename과 headername설정
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


const Products=()=> {
  const [search, setSearch]=useState('');
  const [searchData, setSearchData]=useState('');
  const [products, setProducts]=useState('');
  const [rendered, setRendered]=useState('');
  const [cat1, setCat1]=useState('');
  const [cat2, setCat2]=useState('');
  const [cat3, setCat3]=useState('');
  const [cat4, setCat4]=useState('');
  const [cat5, setCat5]=useState('');
  const [cat6, setCat6]=useState('');

  // product list 가져오기
  const renderProduct = async()=> {

    const response =  await axios.get('http://13.124.164.255/api/product/productlist/')
    console.log(response.data);
    setProducts(response.data);
    let _cat1=response.data.filter((data)=>data.type==='DIY/공구');
    let _cat2=response.data.filter((data)=>data.type==='패브릭');
    let _cat3=response.data.filter((data)=>data.type==='가전');
    let _cat4=response.data.filter((data)=>data.type==='가구');
    let _cat5=response.data.filter((data)=>data.type==='수납/정리');
    let _cat6=response.data.filter((data)=>data.type==='장식/조명');
    setCat1(_cat1);
    setCat2(_cat2);
    setCat3(_cat3);
    setCat4(_cat4);
    setCat5(_cat5);
    setCat6(_cat6);
  }
  const checkUser = () =>{
    const user = localStorage.getItem('user');
    console.log(user);
    if (!user){
        window.location.href = "/onboard";
    }
  }
  const handleSearch = (e)=>{
    e.preventDefault();

    if(e.target.value){
      setSearch(e.target.value);
    }
  }
  const submitHandler =(e) =>{
    e.preventDefault();
    axios
    .get(`http://13.124.164.255/api/product/add/?search=${search}`)
    .then((res)=>{
      setSearchData(res.data);
      setRendered(search);
      setSearch('');
      
    })
    .catch(err=>console.log(err));
  }

  useEffect(()=>{
    renderProduct();
    checkUser();
  },[])

  const closeHandler =(e)=>{
    setSearch(false);
    setSearchData(false);
    setRendered(false);
  }

  return(
    <>
      <div className="curation-container">
        <div className="curation-container-header">
          <div className="curation-title-box">Products</div>
          <div className="container-header-search">
            <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <TextField
              id="search-box"
              className="search-box"
              variant="outlined"
              color="secondary"
              placeholder="검색어를 입력하세요"
              inputProps={{ 'aria-label': '검색어를 입력하세요' }}
              value={search}
              onChange={handleSearch}
            />
            <IconButton type="submit" className="search-icon-btn" aria-label="search">
              <SearchIcon />
            </IconButton>
            </form>
          </div>
          <div className="curation-add-box">
            <ProductAdd/>
          </div>
        </div>
        {!searchData? (
          <>
          <Tabs
          defaultActiveKey="전체"
          id="curation-tab"
          className="curation-tab"
          >
          <Tab eventKey="전체" title="전체">
            <ProductCards data={products}/>
          </Tab>
          <Tab eventKey="DIY/공구" title="DIY/공구">
            <ProductCards data={cat1}/>
          </Tab>
          <Tab eventKey="패브릭" title="패브릭">
            <ProductCards data={cat2}/>
          </Tab>
          <Tab eventKey="가전" title="가전">
            <ProductCards data={cat3}/>
          </Tab>
          <Tab eventKey="가구" title="가구">
            <ProductCards data={cat4}/>
          </Tab>
          <Tab eventKey="수납/정리" title="수납/정리">
            <ProductCards data={cat5}/>
          </Tab>
          <Tab eventKey="장식/조명" title="장식/조명">
            <ProductCards data={cat6}/>
          </Tab>

        </Tabs>
        </>

        ) :
        (
          <>
          <div className="search-result-container">
          <h3 className="search-result-title">
            <span className="hightlight">{rendered}</span> 키워드로 검색한 결과입니다.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={closeHandler} className='delete-btn'>×</button>
          </h3>
          <ProductCards data={searchData}/>
          </div>
          </>
          
        )}
        
        
      </div>

    </>
  )
}

export default Products;