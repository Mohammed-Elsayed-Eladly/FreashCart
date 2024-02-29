/* eslint-disable no-undef */

import {useFormik} from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'

export default function Login({savedata}) {

    
    let [loding,setloding]=useState(false)

      let nav = useNavigate()

     // show erorr masege

    let [errorMessage,setErrorMessage]=useState("")
     // validation form
    let validationSchema =Yup.object({
        
        email:Yup.string().required("email  required").email("enter valid email").min(3,"min length 7"),
        password:Yup.string().required("password  required").matches(/^[A-Z][a-z1-9]{5,20}$/,"enter valid password"),
        })

    let basurl="https://ecommerce.routemisr.com"
     // formik 
  let loginform = useFormik({
    initialValues:{

        email:"",
        password:"",
  
     },
     validationSchema,
     onSubmit,
 
   })
 
   async function onSubmit(valus){
    setloding(true)
    let {data} =await axios.post(`${basurl}/api/v1/auth/signin`,valus).catch((err)=>{
      setErrorMessage(err.response.data.message)
      setloding(false)
    })
    setloding(false)
    if (data.message == 'success') {
      nav('/home')
      savedata(data.user)
      localStorage.setItem("userToken",data.token)
    }
    
}


  return <>
<div className="container">
<div className="row">
    <h3 className='fw-bold py-5'>Login:</h3>
    {errorMessage == "" ? null:<div className="alert alert-danger">{errorMessage}</div>}
    
    <form onSubmit={loginform.handleSubmit}>
        
        <div>   
            <label className=' p-1' htmlFor="email">email :</label>
            <input onChange={loginform.handleChange}  className='form-control' type="email"  name='email' id='email'/>
            <p className="text-danger">{loginform.errors.email}</p>

        </div>
        <div>
            <label className=' p-1' htmlFor="password">password :</label>
            <input onChange={loginform.handleChange}  className='form-control' type="password"  name='password' id='password'/>
            <p className="text-danger">{loginform.errors.password}</p>

        </div>
        <Link to={'/ForgotPassowrd'}>ForgetPassowrd?...</Link>
        {loding ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(loginform.isValid && loginform.dirty)} type='submit' className='btn btn-success ms-auto d-block'>Login</button>
        }
       
    </form>
  </div>
</div>
  </>
}
