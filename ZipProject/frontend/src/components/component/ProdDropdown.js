import React , {useState, useEffect} from 'react';
import {Dropdown, DropdownButton, OffcanvasTitle }from 'react-bootstrap';

const ProdDropdown =({title}) =>{
    const onSelect = (e) =>{
        if(e==='전체'){
            window.location.href=`/products/`
        }
        else{
            window.location.href=`/product-category/${e}`
        }
    }
    return (
        <>
        <DropdownButton
        id="dropdown-button-dark-example2"
        variant="secondary"
        menuVariant="dark"
        title= {title}
        className="mt-2"
        onSelect={(eventKey)=>onSelect(eventKey)}
        >
        <Dropdown.Item eventKey='DIY/공구' active>DIY/공구</Dropdown.Item>
        <Dropdown.Item eventKey='패브릭'  active>패브릭</Dropdown.Item>
        <Dropdown.Item eventKey='가전'  active>가전</Dropdown.Item>
        <Dropdown.Item eventKey='가구' active>가구</Dropdown.Item>
        <Dropdown.Item eventKey='수납/정리'  active>수납/정리</Dropdown.Item>
        <Dropdown.Item eventKey='장식/조명'  active>장식/조명</Dropdown.Item>
        <Dropdown.Item eventKey='전체'  active>전체</Dropdown.Item>
        </DropdownButton>
        </>
    )

}
export default ProdDropdown;