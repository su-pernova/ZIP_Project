import React , {useState} from 'react';
import '../../App.css';
import '../css/Products.css'
import '../css/CurationAdd.css'
import { Modal , Button} from 'react-bootstrap';
import axios from 'axios';
import CurationAddForm from '../forms/CurationAddForm';

const ProductAdd = ()=>{
    const [show, setShow] = useState(false);

    
    const handleClose = () => {
        setShow(false)
        window.location.href = "/curations";
    };
    const handleShow = () => setShow(true);

    const [values, setValues]=useState({
        title:'',
        user:1,
        content:'',
        image:null,
        price:'',
        shop_type:'비매품',
        shop_url_location:'',
        type:'가구',
    })
    const [success, setSuccess]=useState('');

    // curation 만들기
    const handleChange = (e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        });
        console.log(values);
    }
    const handleImageChange = (e)=>{
        setValues({
            ...values,
            image:e.target.files[0]
        })
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(values);
        const user = localStorage.getItem('user');
        // form data 만드는 부분
        let form_data=new FormData();
        form_data.append('title', values.title);
        form_data.append('user', values.user);
        form_data.append('content', values.content);
        form_data.append('image', values.image);
        form_data.append('price', values.price);
        form_data.append('shop_type', values.shop_type);
        form_data.append('shop_url_location', values.shop_url_location);
        form_data.append('type', values.type);

        // product-add (post)
        axios
        .post('http://13.124.164.255/api/product/add/', form_data, {
            headers:{
                'content-type':'multipart/form-data'
            }
        })
        .then((res)=>console.log(res))
        .catch(err=>console.log(err));

        setValues({
            title:'',
            user:'',
            content:'',
            image:null,
            price:null,
            shop_type:'',
            shop_url_location:'',
            type:'',
        })
        setSuccess('큐레이션이 성공적으로 만들어졌습니다!')
        
        
    }
    return(
        <>
        <Button variant="primary" onClick={handleShow}  aria-labelledby="example-modal-sizes-title-lg" className="add-btn">
            큐레이션 만들기
        </Button>

        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">새 큐레이션을 만들어 보세요</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <CurationAddForm/>
            </Modal.Body>
        </Modal>
        </>
    )   

}

export default ProductAdd;