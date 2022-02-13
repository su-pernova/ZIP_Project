import React, {useState, useEffect} from 'react';
import axios from 'axios';

import '../../App.css';
import '../css/Curations.css';
import {Tabs,Tab} from 'react-bootstrap';

import CurationCards from '../CurationCards';
import CurationAdd from '../component/CurationAdd';

import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

// csrf token 설정
// django의 기본 셋팅에 맞추어 axios 통신의 기본 cookiename과 headername설정
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

const Curations=()=> {
  const [search, setSearch]=useState('');
  const [searchData, setSearchData]=useState('');
  const [curations, setCurations]=useState();
  const [rendered, setRendered]=useState('');
  const [shared, setShared]=useState();
  const [privated, setPrivated]=useState();
  const checkUser = () =>{
    const user = localStorage.getItem('user');
    console.log(user);
    if (!user){
        window.location.href = "/onboard";
    }
}

  // curation list 가져오기
  const renderCuration = async()=> {
    const response =  await axios.get('http://13.124.164.255/api/curation/add/')
    setCurations(response.data);
    let sh=response.data.filter((data)=>data.share===true);
    let pr=response.data.filter((data)=>data.private===true);
    setShared(sh);
    setPrivated(pr);
    console.log(response.data);
    console.log(sh);
    console.log(pr);
  }

  useEffect(()=>{
    renderCuration();
    checkUser();
  },[])

  const handleSearch = (e)=>{
    e.preventDefault();
    if(e.target.value){
      setSearch(e.target.value);
    }
  }

  const submitHandler =(e) =>{
    e.preventDefault();
    axios
    .get(`http://13.124.164.255/api/curation/add/?search=${search}`)
    .then((res)=>{
      setSearchData(res.data);
      setRendered(search);
      setSearch('');
    })
    .catch(err=>console.log(err));
  }

  const closeHandler =(e)=>{
    setSearch(false);
    setSearchData(false);
    setRendered(false);
  }

  return(
    <>
      <div className="curation-container">
        <div className="curation-container-header">
          <div className="curation-title-box">Curations</div>

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
          <CurationAdd />
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
            <CurationCards data={curations}/>
          </Tab>
          <Tab eventKey="공유" title="공유">
            <CurationCards data={shared}/>
          </Tab>
          <Tab eventKey="개인" title="개인">
          <CurationCards data={privated}/>
          </Tab>
        </Tabs>
        </> ):

        ( <>
          <div className="search-result-container">
          <h3 className="search-result-title"><span className="hightlight">
            {rendered} </span> 키워드로 검색한 결과입니다.
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={closeHandler} className='delete-btn'>×</button>
          </h3>
          <CurationCards data={searchData}/>
          </div>
          </>
        )}
      </div>
    </>
  )
}

export default Curations;