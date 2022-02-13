import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import {Tabs,Tab} from 'react-bootstrap';
import '../css/Profile.css';
import ProductCards from '../component/ProductCards';
import CurationCards from '../component/CurationCards';

export default function Profile() {
  const user = localStorage.getItem('user');
  const [profile, setProfile]=useState();
  const [usercuration, setUsercuration]=useState();
  const [userproduct, setUserproduct]=useState();

  const renderProfile=()=>{
    axios
    .get(`http://13.124.164.255/api/users/profile/${user}/`)
    .then((res)=>{
      setProfile(res.data);
    })
    .catch(err=>console.log(err));
  };

  const getCurationData=async()=>{
    const response= await axios.get('http://13.124.164.255/api/curation/curationlist/');
    let userCuration=response.data.filter((data)=>data.user===user);
    setUsercuration(userCuration);
  }

  const getProductData=async()=>{
    const response= await axios.get('http://13.124.164.255/api/product/productlist/');
    let userProduct=response.data.filter((data)=>data.user===user);
    setUserproduct(userProduct);
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    axios
    .post('http://13.124.164.255/api/users/auth/logout/')
    .then((res)=>console.log(res))
    .catch(err=>console.log(err));

    window.location.href = "/";
  };
  useEffect(()=>{
    renderProfile();
    getCurationData();
    getProductData();
  },[]);

  return (
    <div>

    <div className="profile-container">
      <div className="profile-header">
        <div>
          <Avatar className="profile-avatar">
            {user}
          </Avatar>
          {profile && <div className="hi-msg">{profile.last_name} 님 환영합니다.</div>}
          <button onClick={handleLogout} className="logout-btn">로그아웃</button>

        </div>
      </div>
      <div className="profile-body">
        <Tabs
          defaultActiveKey="내 큐레이션"
          id="curation-tab"
          className="curation-tab"
        >
          <Tab eventKey="내 큐레이션" title="내 큐레이션">
            <CurationCards data={usercuration}/>
          </Tab>
          <Tab eventKey="내 상품" title="내 상품">
            <ProductCards data={userproduct}/>
          </Tab>
        </Tabs>
      </div>
    </div>

    </div>
  );
}