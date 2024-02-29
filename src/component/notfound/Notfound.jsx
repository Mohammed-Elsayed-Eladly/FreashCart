import React from 'react'
import imgnotfound from "../../assets/images/error.svg"

export default function Notfound() {
  return <>
<div className="container">
  <div className="row">
  <img className='w-100'  src={imgnotfound} alt="" />
  </div>
</div>
  </>
}
