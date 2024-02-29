/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import $ from "jquery"
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import toast, { Toaster } from "react-hot-toast";






export default function Product() {


  let {addCart,setCartCount ,addWishlist} =useContext(CartContext)




  let [productList,setProductList] = useState([])
  let basUrl =`https://ecommerce.routemisr.com`
  
  let page = 0
  
  useEffect(()=>{
  
    gitProuduct()
  
      $(".pageItem").on("click",function(e){
  
        let page =$(e.target).html()
        gitProuduct(page)
    })
  
    $('.next').on("click" , function(){
      page ++
      gitProuduct(page)
     
    })
  
    $('.Previous').on("click" , function(){
      page --
      gitProuduct(page)
     
    })
  
  
  },[])
  
  
  async function gitProuduct(page = 1){
  
  
    let {data} =await axios.get(`${basUrl}/api/v1/products?page=${page}`)
    setProductList(data.data)
    $(".loading").fadeOut(1000)
  }

async function addDataToCart(id){
  let {data} =await addCart(id)



  if(data.status == "success"){
    
    setCartCount(data.numOfCartItems)
    
    toast.success(data.message,{
      position: 'top-right',
      className: 'border border-success p-3 bg-success text-white' ,
      duration: 1000,
      icon: '👏'
    })
  }else{
    toast.error("Error",{
      position: 'top-right',
      className: 'border border-danger p-2' ,
      duration: 1000,
    })
  }
}
  



async function WishList(id){
  let {data} =await addWishlist(id)


      if(data.status == "success"){
        $('#wish').css('color','red')
        toast.success(data.message,{
          position: 'top-right',
          className: 'border border-success p-3 bg-success text-white' ,
          duration: 1000,
          icon: <i class="fa-solid fa-heart fs-3 text-danger"></i>
        })
      }else{
        toast.error("Error",{
          position: 'top-right',
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
  

  <div className="container">
  <div className="row my-5 g-4">


    <div>
    <input className="form-control w-75  m-auto" type="search"  placeholder="search.."/>
    </div>
  
  {productList.map(  (product)=>{
  
    return <div key={product._id} className="col-md-3 col-sm-2" > 
    
  
  
  <div className="product">
    <Link to={"/ProductDetelse/" +product._id } >
    <img src={product.imageCover} className="w-100" alt="" />
    <p className="text-main">{product.category.name}</p>
    <h6>{product.title.split(" ").slice(0,2).join(" ")}</h6>
  
    <div className="d-flex justify-content-between">
      <span>{product.price}</span>
      <span>
        <i onClick={()=>addDataToCart(product._id )} className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}
      </span>
    </div>

    </Link>

    <div className="d-flex py-2">
      <span  onClick={()=>WishList(product._id )} className="ms-auto cursor-pointer" > <i id="wish" class="fa-solid fa-heart fs-3"></i> </span>
    </div>

    <button onClick={()=>addDataToCart(product._id )} className="btn btn-success w-100  d-block ">Add Cart</button>
  </div>
  
  
      </div>

  }  )}
  
  <nav className="d-flex justify-content-center py-5" aria-label="Page navigation example">
    <ul className="pagination">
      <li className="page-item">
        <a className="page-link cursor-pointer Previous" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li className="page-item cursor-pointer"><a className="page-link pageItem" >1</a></li>
      <li className="page-item cursor-pointer"><a className="page-link pageItem" >2</a></li>
      <li className="page-item">
  
        <a className="page-link cursor-pointer next"   aria-label="Next">
          <span className="next" aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  
   </div> 
  </div>

  </>
}
