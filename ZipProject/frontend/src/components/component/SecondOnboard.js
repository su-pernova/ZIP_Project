import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import {AiOutlineArrowLeft} from "react-icons/ai";
import { makeStyles } from '@material-ui/core/styles';
import ImageSet from "./ImageSet";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    avartar: {
      width:'200px',
      height:'200px',
    },
    nickname:{
      width: '350px',
      height: '80px',
    }
  }));

const SecondOnboard =({nextStage, handleChange, handleImageChange, setIndex, prevStage}) =>{
    const classes = useStyles();
    const [option, setOption] = useState(0);
    const [attachment, setAttachment] = useState(
      "https://i.stack.imgur.com/GNhxO.png"
    );
  
    function openFile() {
      var input = document.createElement("input");
  
      input.type = "file";
      input.accept = "image/*";
  
      input.click();
      input.onchange = function (event) {
        console.log(event.target.files[0]);
        processFile(event.target.files[0]);
        handleImageChange(event.target.files[0]);
      };
    }
  
    function processFile(file) {
      var reader = new FileReader();
  
      reader.onload = function () {
        var result = reader.result;
        setAttachment(result);
      };
      reader.readAsDataURL(file);
      setOption(1);
    }


    return (
        <>
        <div className="second-onboard-container">
        <div className="prev-icon">
        <AiOutlineArrowLeft onClick={()=>{prevStage()}}/>
        </div>
        <div className="second-onboard-header">
          <div className="second-onboard-title">ZIP에 오신 것을 환영합니다!</div>
          <div className="second-onboard-subtitle">프로필 사진과 이름 대신 사용할 닉네임을 설정해주세요.</div>
        </div>
        {option===0 ?
        (
            <>
            <div onClick={openFile} className="avartar-container">
            <div>
                <Avatar src="/broken-image.jpg" className={classes.avartar}/>
            </div>
            </div>
            </>

        ):(
            <>
            <ImageSet
                attachment={attachment}
                back={() => setOption(0)}
                openFile={openFile}
            ></ImageSet>
            </>
        )}
        <div
         style={{ margin: "20px auto", width: "100%", textAlign: "center" }}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="최대 8글자"
            id="nickname"
            name="nickname"
            onChange={handleChange}
            className={classes.nickname}
        />
        </div>

        </div>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs= {12} sm={6}>
              <Button
              onClick={()=>{
                nextStage(3)
                setIndex(2)
              }}
              fullWidth
              variant="contained"
              className="onboard-btn"
            >
              다음으로
            </Button>
          </Grid>
        </Grid>
        </>

    )
}

export default SecondOnboard;
