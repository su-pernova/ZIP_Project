import React, {useState, useEffect} from 'react';
import '../../App.css';
import CurationCards from '../CurationCards';
import ProductCards from '../ProductCards';
import HeroSection from '../HeroSection';
import Footer from '../Footer';
import axios from 'axios';

function Home() {
  const loginuser = localStorage.getItem('user');
  const [user, setUser] = useState([]);
  const [recommendtags,setRecommendtags]=useState([]);
  const [recommendcurations, setRecommendcurations]=useState([]);
  const [recommendproducts, setRecommendproducts]=useState([]);
  const [popularproducts, setPopularproducts]=useState([]);

  const checkuser=()=>{
    const user = localStorage.getItem('user');
    setUser(user);
    console.log(user);
    if(user){
      setUser(user);
      handleAxios();
    }
  }

  const handleAxios=()=>{
    // handleTagsAxios();
    handleCurationsAxios();
    handleProductsAxios();
    handlePopularProductsAxios();
  }

  // const handleTagsAxios=async()=>{
  //   axios
  //   .get('http://13.124.164.255:8000/api/recommender/top_tag_list/')
  //   .then((res)=>{
  //     console.log(res);
  //     setRecommendtags(res.data);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })
  // }

  const handleCurationsAxios=async()=>{
    const user_ = localStorage.getItem('user');
    axios
    .get(`http://13.124.164.255/api/recommender/recommended_curations/${user_}`)
    .then((res)=>{
      console.log(res);
      setRecommendcurations(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handleProductsAxios=async()=>{
    const user_ = localStorage.getItem('user');
    axios
    .get(`http://13.124.164.255/api/recommender/recommended_products/${user_}`)
    .then((res)=>{
      console.log(res);
      setRecommendproducts(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const handlePopularProductsAxios=async()=>{
    axios
    .get('http://13.124.164.255/api/scrap/product/best/')
    .then((res)=>{
      console.log(res);
      setPopularproducts(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    checkuser();
  },[]);

  return (
    <>
      <HeroSection/>
      <div className="home-body">
      { user && <>
        <h3 className="home-section-title">{user} 님을 위한 <span className="user-highlight">추천 큐레이션 리스트</span></h3>
        <hr></hr>
        <div>
          <CurationCards data={recommendcurations}/>
        </div>
      </> }

      { !user && <>
        <br></br><br></br><br></br>
        <h3 className="need-login">ZIP 이용을 위해 로그인 해주세요!</h3>
        {/* <h3 className="home-section-title">최근 인기 <span className="user-highlight">큐레이션 리스트</span></h3>
        <hr></hr>
        <div>
          <CurationCards data={popularproducts}/>
        </div> */}
      </> }

      { user && <>
        <h3 className="home-section-title">{user} 님을 위한 <span className="user-highlight">추천 상품 리스트</span></h3>
        <hr></hr>
        <div>
          <ProductCards data={recommendproducts}/>
        </div>
      </> }

      { !user && <>
        {/*<h3 className="home-section-title">최근 인기 <span className="user-highlight">상품 리스트</span></h3>
         <hr></hr>
        <div>
          <ProductCards data={popularproducts}/>
        </div> */}
      </> }

      </div>
      <Footer/>
    </>
  );
}

export default Home;