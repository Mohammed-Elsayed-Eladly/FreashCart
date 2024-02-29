import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from "yup"
import {useNavigate} from "react-router-dom"

export default function ForgotPassowrd(userdata) {


    let nav=useNavigate() 

    let [loding,setloding]=useState(false)

    let [messageError , srtMessageError]=useState("")

let basUrl="https://ecommerce.routemisr.com"



let validationSchema =Yup.object({
    email:Yup.string().required("email  required").email("enter valid email").min(3,"min length 7"),
})




let forgetPassword =useFormik({

    initialValues:{
        email:" "
    },
    validationSchema,
    onSubmit:sendForgetApi
})

 async function sendForgetApi(userEmail){
    setloding(true)
    let {data} = await axios.post(`${basUrl}/api/v1/auth/forgotPasswords`,userEmail).catch((err)=>{
        console.log(err.response.data.statusMsg);
        srtMessageError(err.response.data.message)
        setloding(false)
    })
    setloding(false)

   
if( data.statusMsg == "success"){
    nav("/MessageCode")
}
    
}

  return <>
  
<div className="container">

<h3 className='py-5'>forget passowrd</h3>

{messageError == "" ?null:<div className="alert alert-danger">{messageError}</div>}


<form onSubmit={forgetPassword.handleSubmit}>

<div className='py-3'><label className='py-1' htmlFor="email">enter email</label>
<input onChange={forgetPassword.handleChange} onBlur={forgetPassword.handleBlur}  className='form-control' type="email" name='email' id='email' />
{forgetPassword.touched.email ? <p className='text-danger'>{forgetPassword.errors.email}</p>:""}
</div>

{loding ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(forgetPassword.isValid && forgetPassword.dirty)} type='submit' className='btn btn-success ms-auto d-block'>send code</button>
        }
  </form>
</div>

  </>
}
