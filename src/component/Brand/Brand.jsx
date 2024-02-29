import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'

export default function Brand() {


  let{gitAllBrand}=useContext(CartContext)

let[brand,setbrand]=useState(null)

useEffect(()=>{

  gitBrand()

},[])

  async function gitBrand(){
    let {data} =await gitAllBrand()
    setbrand(data)
  }

  


  return <>
  

  <div className="container my-5">

  <h2 className='text-center text-success fw-bolder'>All Brands</h2>

    <div className="row py-3">
 {brand?.data.map((el)=>{
        return<>
            
        <div className="col-md-3 py-3">

            <div className='brand border border-success'>
            <img className='w-100' src={el.image} alt="" />
            <p className='text-center'>{el.name}</p>
            </div>

    </div>


        </>



    })}
    </div>
 
  </div>

  </>
}

