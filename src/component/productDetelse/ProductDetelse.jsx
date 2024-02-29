import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import $ from "jquery"

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/CartContext";




export default function ProductDetelse() {

  let {addCart} =useContext(CartContext)


    let basurl="https://ecommerce.routemisr.com"
    let {id} = useParams()
    

    let [productDetels , setProductDetels] = useState(null)

    async function detProductDetels(){
        $(".loading").fadeIn(1000)
        let {data}=await axios.get(`${basurl}/api/v1/products/${id}`)
        
        setProductDetels(data.data)
        $(".loading").fadeOut(1000)
    }

    useEffect(()=>{
        detProductDetels()
    },[] )




    
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
        // console.log(data.data);
      }



  return <>
  <Toaster/>
   <div className="loading position-fixed top-0 bottom-0 end-0 start-0 bg-white">
    <i className="fa-solid fa-spinner fa-spin text-success fa-5x "></i>
  </div>


{productDetels != null ?  <div className="container">
    <div className="row my-5 align-items-center">
        <div className="col-md-3">
            

        <OwlCarousel className='owl-theme' autoplay autoplayTimeout={3000} items={1} loop >
            {productDetels.images.map( (el)=>{
                
                
                return<>
                <div key={productDetels._id} className='item'>
<img  className="w-100" src={el} alt="" />
    </div>
                </>
                
            })}
        </OwlCarousel>;
        </div>
        <div className="col-md-9 py-5">
            <h2 className="text-muted">{productDetels.description}</h2>
            <p className="py-4">{productDetels.title}</p>
            <h4> {productDetels.category.name}</h4>
            <div className="d-flex justify-content-between py-2">
                <span>{productDetels.price} EGP</span>
                <span>
                    <i className="fa-solid fa-star rating-color"></i>{productDetels?.ratingsAverage}
                </span>
            </div>

            <button onClick={()=>addDataToCart(productDetels._id)} className="btn btn-success w-100 ">+ add to cart</button>

        </div>
    </div>
  </div> : ""}
 

  </>
}
