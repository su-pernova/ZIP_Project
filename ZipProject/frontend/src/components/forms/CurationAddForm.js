import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import {ProgressBar} from 'react-bootstrap';
import { DropzoneArea } from 'material-ui-dropzone';
import {Button} from 'react-bootstrap';

import axios from 'axios';
import '../css/CurationAdd3.css'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100%',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(120),
            height: theme.spacing(80),
        },
    },
    paper_container:{
        margin: '0 auto',
    },
    shareBtn:{
        backgroundColor: '#EC6D37',
        marginRight: '20px',
      },
  }));

const CurationAddForm= ()=> {
    const [now, setNow] = useState(0);
    const [check, setCheck] =useState(0);
    const [success,setSuccess]=useState(false);
    const [values, setValues]=useState({
        title:'',
        content:'',
        user:'',
        category:'',
        content:'',
        image:'',
        private: false,
        share:false,
        tags:'',
    })
    const [checkv, setCheckv]=useState({
        title:false,
        content:false,
        user:false,
        category:false,
        content:false,
        image:false,
        private: false,
        share:false,
        tags:false,
    })

    // curation 만들기
    const handleChange = (e)=>{
        if(e.target.name==='private' ||e.target.name=='share'){
            setValues({
                ...values,
                [e.target.name]:true
            })
        }
        else{ 
            setValues({
                ...values,
                [e.target.name]:e.target.value
            });
        }
        setCheckv({
            ...checkv,
            [e.target.name]:true
        })
        if(checkv[e.target.name]===false &&e.target.name!=='tags'){
            setNow(now+20);
            console.log(e.target.name);
        }
    }
    const handleImageChange = (e)=>{
        if(e[0]=== undefined){
            return;
        }
        else{
            console.log('이미지 파일',e[0]);
            setValues({
                ...values,
                image:e[0]
            })
            setCheckv({
                ...checkv,
                image:true
            })
            if(checkv.image===false){
                setNow(now+20);
                console.log('image');
            }
        }
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(values);
        const user=localStorage.getItem('user');
        let form_data=new FormData();
        form_data.append('title', values.title);
        form_data.append('content', values.content);
        form_data.append('image',values.image, values.image.name);
        form_data.append('user', user);
        form_data.append('private', values.private);
        form_data.append('share', values.share);


        console.log('form_data입니다',form_data);
        setSuccess(true);
        axios
        .post('http://13.124.164.255/api/curation/add/', form_data, {
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>console.log(res))
        .catch(err=>console.log(err));

        setValues({
            title:'',
            content:'',
            user:'',
            category:'',
            content:'',
            image:'',
            private: false,
            share:false,
            tags:'',
        })
        
    }
    const onClickProduct = ()=>{
        window.location.href = "/products";
    }
    const onClickCuration = ()=>{
        window.location.href = "/curations";
    }
    const classes=useStyles();
    

  return (
        <div className={classes.root}>
            <Paper className={classes.paper_container}>
                {!success?
                (
                    <>
                <div className="progress-desc">
                    {now}% 만큼 채워졌습니다.
                </div>
                <ProgressBar animated now={now}  label={`${now}%`} max={100}></ProgressBar>
                <form className="form-container" onSubmit={submitHandler}>
                    <div className="right-container">
                        <div className="image-container" >
                            <div>큐레이션 커버</div>
                            <div className="image-box">
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"드래그하거나 클릭해서 업로드"}
                                    onChange={(files) => console.log('Files:', files)}
                                    name="image"
                                    onChange={handleImageChange}
                                    className="dropzone"
                                />
                            </div>
                        </div>
                        <div className="show-container">
                            <div>큐레이션 공개</div>
                            <div className="checkbox-container">
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="share" 
                                            id="share"
                                            value={values.share}
                                            onChange={handleChange} 
                                            on/>
                                    <label className="form-check-label" htmlFor="share">
                                        <Button size="sm" className="share_Btn">
                                        공유
                                        </Button> 
        
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input  className="form-check-input" 
                                            type="radio" 
                                            name="private" 
                                            id="private"
                                            value={values.private}
                                            onChange={handleChange}/>
                                    <label className="form-check-label"  htmlFor="private">
                                    <Button variant="primary" size="sm" >
                                    개인
                                    </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left-container">
                            <div className="form-box">
                                <div className="mb-3">
                                <label  htmlFor="title" className="form-label">큐레이션 제목</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="title"
                                        id="title" 
                                        placeholder="큐레이션 제목을 입력하세요"
                                        value={values.title}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div className="mb-3">
                                <label  htmlFor="content" className="form-label">큐레이션 설명</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="content"
                                        id="content" 
                                        placeholder="큐레이션 설명을 입력하세요"
                                        value={values.content}
                                        onChange={handleChange}
                                        required/>

                                </div>
                                <div className="mb-3">
                                <label htmlFor="category" className="form-label">큐레이션 카테고리</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="category"
                                        id="category" 
                                        placeholder="큐레이션 카테고리를 입력하세요"
                                        value={values.category}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div className="mb-3">
                                <label  htmlFor="tags" className="form-label">검색용 키워드</label>
                                <input  type="text" 
                                        className="form-control" 
                                        name="tags"
                                        id="tags" 
                                        placeholder="#북유럽 스타일 # 화이트 인테리어"
                                        value={values.tags}
                                        onChange={handleChange}
                                        />
                                </div>
                            </div>
                    </div>
                    <button onClick={submitHandler} className="form-btn">
                        큐레이션 만들기
                    </button>
                </form>
                    </>
                )
                :
                (
                    <>
                    <div className="success-container">
                        <div className="success-title">
                        큐레이션이 성공적으로 만들어졌습니다.
                        </div>
                        <div className="btn-container">
                            <button className='btn'onClick={onClickProduct}>
                                상품 추가하러가기
                            </button>
                            <button className="btn" onClick={onClickCuration}>
                                큐레이션 리스트 보러가기
                            </button>
                        </div>
                    </div>
                    </>
                )
                }  
            </Paper>
        </div>
  );
}

export default CurationAddForm;