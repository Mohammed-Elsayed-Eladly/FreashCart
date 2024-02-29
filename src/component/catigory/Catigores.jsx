import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'

export default function Catigores() {

    let{gitAllCatigores} =useContext(CartContext)
    let [catigore ,setCatigore] =useState(null)


    useEffect(()=>{
        getCatigores()
    },[])

    async function getCatigores(){
        let {data} = await gitAllCatigores()
        setCatigore(data.data)
    }


  return<>

<div className="container">
    <div className="row">
        {catigore?.map(  (el)=>{
            return<div className="col-md-4 py-3">
                
                    <div className='brand border border-success '>
                        <div className='overflow-hidden position-relative  bg-black '>
                        <img className='w-100 mainImge' src={el.image} alt="" />
                        </div>
                        <p className='text-center py-3'>{el.name}</p>
                    </div>
                </div>
        }  )}
    </div>
</div>

  </>
}
