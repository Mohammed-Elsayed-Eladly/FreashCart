import React, {  useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import $ from "jquery"
import { Link , useNavigate} from 'react-router-dom'


export default function Cart() {

    let[cartData,setCartData]=useState(null)
    let {errorCart,cartCount,getAllCartData,deletCartData,updateProductQuantany,deletAllCartData ,setCartCount} = useContext(CartContext)
let nav = useNavigate()




    useEffect(()=>{
        $(".loading").fadeIn(1000)
        getData()
        
    $(".loading").fadeOut(1000)


        console.log(errorCart);
  

    },[])




    async function getData(){
        let {data} = await getAllCartData()

        console.log(data.status);
        setCartData(data.data)

        if(data.status == 'success'){
            setCartData(data.data)
        }else{
            setCartData(data.data)
        }
    }



    async function deletProduct(id){
        $(".loading").fadeIn(1000)
        let {data} = await deletCartData(id)
        setCartData(data.data)
        setCartCount(data.numOfCartItems)
    $(".loading").fadeOut(1000)

    }


    async function deletAllProduct(){
        $(".loading").fadeIn(1000)
        let {data} = await deletAllCartData()


        setCartData(data.data)
        setCartCount(data.numOfCartItems)

        
        
        $(".loading").fadeOut(1000)

        if(data.message == "success"){
            nav("/home")
        }
    

    }


    async function updateCount(id,count){
        let {data} = await updateProductQuantany(id,count)
        setCartData(data.data)

    }
    
return <>

<div className="loading position-fixed top-0 bottom-0 end-0 start-0 opacity-50 z-2 bg-white">
    <i className="fa-solid fa-spinner fa-spin text-success fa-5x "></i>
    </div>

<div className="container-fluide d-flex align-items-center justify-content-center">
<div className='container bg-light   my-5'>


<div className='py-2 d-flex align-items-center justify-content-between'>

    <h3 className='fw-bold fs-3'>Cart shop</h3>
    <Link to={'/CheckOut/'+cartData?._id }className='btn btn-primary p-3'> <i className="fa-brands fa-cc-amazon-pay px-2"></i>CheckOut</Link>
    </div>

    <div className='d-flex align-items-center justify-content-between py-5'>
    <h5 className='text-dark'>Total price : <span className='text-main'>{cartData?.totalCartPrice}</span></h5>
    <h5 className='text-black'>total number of items: <span className='text-main'>{cartCount}</span></h5>
    </div>

    {cartData?.products.map((el)=>{

        console.log();

        if(el.count == 0){
            deletProduct(el.product._id)
        }

        return<div key={el._id} className="row border-bottom justify-content-between py-5" >
        <div className="col-md-6">
            <div className="row p-2 align-items-center">
                <div className="col-md-2 position-relative">
                    <img className='border border-success shadow w-100' src={el.product.imageCover} alt="" />
            </div>
            <div className="col-md-9">
            <h4>{el.product.title}</h4>
            <p className='text-main'><span className='text-black'>price</span> : {el.price}</p>
            <button onClick={()=>deletProduct(el.product._id)} className='btn text-main border border-3 p-1'><i className="fa-regular fa-trash-can px-1 text-danger"></i>remove</button>
            </div>
        </div>
    </div>
    <div className="col-md-5 d-flex justify-content-center align-items-center">
        <span onClick={() => updateCount(el.product._id, el.count + 1)} className='btn btn-white border border-success btn-sm' >+</span>
        <span className='px-2 fs-4'>{el.count}</span>
        <span  onClick={()=>updateCount(el.product._id ,el.count - 1 )} className='btn btn-white border border-danger btn-sm '>-</span>

    </div>
</div> 
    })}




<div className='d-flex'>
    <button onClick={()=>(deletAllProduct())} className='btn btn-white m-auto py-2 px-3 border-success border border-1'> <i className="fa-regular fa-trash-can px-1 text-danger"></i> Clear All</button>
</div>

</div>


</div>

</>

}