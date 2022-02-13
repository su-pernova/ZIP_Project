import React, {useState} from 'react';
import { Modal , Button} from 'react-bootstrap';
import { Box, Stepper, Step, StepLabel} from '@material-ui/core';
import FirstOnboard from '../component/FirstOnboard';
import LoginForm from '../component/LoginForm';
import '../css/Onboard.css';

const Onboard = () =>{
    
    const [show, setShow] = useState(1);
    const [index, setIndex]=useState(0);
    const steps=[
        '개인정보 입력',
        '프로필 및 닉네임 등록',
        '취향파악'
    ]
    const nextShow =(page) =>{
        setShow(page);
    }
    const prevShow=()=>{
        setShow(show-1);
    }
    const handleClose = () => {
        setShow(false)
        window.location.href = "/";
    };
    const handleShow = () => setShow(true);
    const render =() =>{
        switch(show){
            case 1:
                return <FirstOnboard nextShow={nextShow} setIndex={setIndex}/>
            case 2:
                return <LoginForm prevShow={prevShow}/>
            default:
                return <div>ㅇㄴ라ㅓ</div>
        }
    }
    
    return (
        <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
        {show!==2&&
                <Box sx={{ width: '100%' }}>
                <Stepper activeStep={index} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                </Box>
        }
        </Modal.Header>
        <Modal.Body>
            {render()}
        </Modal.Body>
    </Modal>
    )
}

export default Onboard;