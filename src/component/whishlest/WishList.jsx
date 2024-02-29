import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import $ from "jquery"
import toast ,{ Toaster } from 'react-hot-toast'


export default function WishList() {

  
  let {getAllwishtData,deletWishListData,addCart}=useContext(CartContext)
  let[wishList,setWishList] = useState(null)

  useEffect(()=>{
    
    $(".loading").fadeIn(1000)

    gitWishlist()
    $(".loading").fadeOut(1000)

  },[])


  async function gitWishlist(){
    $(".loading").fadeIn(1000)
    let {data} =await getAllwishtData()
    setWishList(data.data)
    $(".loading").fadeOut(1000)
  }




  async function deletWishLest(id){  
    let{data} = await deletWishListData(id)
    setWishList(data.data)

  }



  async function addDataToCart(id){
    let {data} =await addCart(id)
  
      if(data.status == "success"){
    toast.success(data.message,{
      position: 'top-right',
    className: 'border border-success p-3 bg-success text-white' ,
    duration: 1000,
    icon: '👏'
    })
  }else{
    toast.error("Error",{
      position: 'top-center',
      className: 'border border-danger p-2' ,
      duration: 1000,
    })
  }

  }








  return <>
  <Toaster/>
  
  <div className="loading position-fixed top-0 bottom-0 opacity-50 z-2 end-0 start-0 bg-white">
      <i className="fa-solid fa-spinner fa-spin text-success fa-5x "></i>
    </div>



  <div className="container my-5 bg-light">
    
  <h3 className='text-uppercase py-3 fw-bolder'>wish list</h3>


  {wishList?.map((el)=>{

        return<div key={el.id} className="row border-bottom justify-content-between py-5" >
        <div className="col-md-10">
            <div className="row p-2 align-items-center">
                <div className="col-md-8">
                  <div className="row align-items-center justify-content-center">
                  <div className="col-md-3 position-relative">
                    <img className='w-100' src={el.imageCover} alt="" />
            </div>
            <div className="col-md-9 ">
            <h4>{el.title}</h4>
            <p className='text-success'>price : {el.price}</p>
            <button onClick={()=>deletWishLest(el._id)} className='btn  text-danger' > <i className="fa-regular fa-trash-can text-danger"></i> remove</button>
            </div>
                  </div>
                </div>
        </div>
    </div>
    <div className="col-md-2">
    <button onClick={()=>addDataToCart(el._id)}  className="btn btn-success ms-auto ">+ add to cart</button>

    </div>
</div> 
    })}

  </div>

  </>
}
