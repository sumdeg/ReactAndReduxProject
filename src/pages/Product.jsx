import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import  { modalFunc } from "../redux/modalSlice";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import  { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { useLocation } from "react-router-dom";


const Product=()=>{
    const {modal} =useSelector(state=>state.modal)
    const {data,keyword} =useSelector(state=>state.data)

    const dispatch=useDispatch()
    const location=useLocation()
    const [productInfo, setProductInfo]=useState({name:"",price:"",url:""})

    const onChangeFunc=(e,type)=>{
        if(type==="url"){
            setProductInfo(prev=>({...prev,[e.target.name]: URL.createObjectURL(e.target.files[0])}))
        }
        else{
            setProductInfo(prev=>({...prev,[e.target.name]: e.target.value}))
        }
    }

    let loc=location?.search.split('=')[1] || null;

    useEffect(()=>{
        if(loc!=null){
            setProductInfo(data.find(dt => dt.id === loc))
        }
    },[])
   


    console.log(location?.search.split('=')[1],"data")
    
    const buttonFunc=()=>{
        dispatch(createDataFunc({...productInfo,id:data.length+1}))
        dispatch(modalFunc())
       
    }
    const buttonUpdateFunc=()=>{
        dispatch(updateDataFunc({...productInfo,id:loc}))
        dispatch(modalFunc())
    }
    const contentModal=(
        <>
                <Input value={loc ? productInfo.name: null} type={"text"} placeholder={"Ürün Ekle"} name={"name"} id={"name"} onChange={e=>onChangeFunc(e,"name")}/>
                <Input value={loc ? productInfo.price: null}  type={"text"} placeholder={"Fiyat Ekle"} name={"price"} id={"price"} onChange={e=>onChangeFunc(e,"price")}/>
                <Input type={"file"} placeholder={"Resim Seç"} name={"url"} id={"url"} onChange={e=>onChangeFunc(e,"url")}/>
                <Button btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"} onClick={loc ? buttonUpdateFunc : buttonFunc}/>
        </>
    )
    
    const filteredItems=data.filter(dt=>dt.name.toLowerCase().includes(keyword))
    
    return(
        <div>
            <div className="flex items-center flex-wrap">
                {
                    filteredItems?.map((dt,i)=>{
                        return <ProductCard key={i} dt={dt}/>
                    })
                }   
            </div>
            {modal && <Modal content={contentModal} title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}/>}
        </div>
    )
}

export default Product