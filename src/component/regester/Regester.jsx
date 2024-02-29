

import {useFormik} from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

export default function Regester() {

  let nav = useNavigate()

    
      let [loding,setLoding]=useState(false)

    // show erorr masege

    let [errorMessage,setErrorMessage]=useState("")
    // validation form
    let validationSchema =Yup.object({
        name:Yup.string().required("name  required").min(3,"min length 3").max(20,"max length 20"),
        email:Yup.string().required("email  required").email("enter valid email").min(3,"min length 7"),
        password:Yup.string().required("password  required").matches(/^[A-Z][a-z1-9]{5,20}$/,"enter valid password"),
        rePassword:Yup.string().required("confirm Password required").oneOf([Yup.ref("password")]),
        phone:Yup.string().required("phone  required").min(3,"min length 3").max(20,"max length 20").matches(/^01[1520][0-9]{8}$/,"enter valid phone"),
    })
  

    let basurl="https://ecommerce.routemisr.com"

    // formik 
  let registeform = useFormik({
    initialValues:{
        name:"", 
        email:"",
        password:"",
        rePassword:"",
        phone:""
    },
    validationSchema,
    onSubmit,

  })

  async function onSubmit(valus){
    setLoding(true)
    let {data}=await axios.post(`${basurl}/api/v1/auth/signup`,valus).catch((error)=>{
        setErrorMessage(error.response.data.message)
    setLoding(false)
      console.log(data);
    })
    setLoding(false)

    if(data.message == 'success'){
      nav('/login')
    }

    // console.log(data.message);

    
  }



  return <>
<div className="container">
<div className="row">
    <h3 className='fw-bold py-5'>Register Now:</h3>
    {errorMessage == "" ? "":<div className="alert alert-danger">{errorMessage}</div>}
    
    <form onSubmit={registeform.handleSubmit}>
        <div>
            <label className=' p-1' htmlFor="name">name :</label>
            <input onBlur={registeform.handleBlur} onChange={registeform.handleChange}  className='form-control' type="text"  name='name' id='name'/>
            {registeform.touched.name ?<p className="text-danger">{registeform.errors.name}</p>:""}
        </div>
        <div>   
            <label className=' p-1' htmlFor="email">email :</label>
            <input onBlur={registeform.handleBlur} onChange={registeform.handleChange}  className='form-control' type="email"  name='email' id='email'/>
            {registeform.touched.email ?<p className="text-danger">{registeform.errors.email}</p> :""}

        </div>
        <div>
            <label className=' p-1' htmlFor="password">password :</label>
            <input onBlur={registeform.handleBlur} onChange={registeform.handleChange}  className='form-control' type="password"  name='password' id='password'/>
            {registeform.touched.password ?<p  className="text-danger">{registeform.errors.password}</p>:""}

        </div>
        <div>
            <label className=' p-1' htmlFor="rePassword">password :</label>
            <input onBlur={registeform.handleBlur} onChange={registeform.handleChange}  className='form-control' type="password"  name='rePassword' id='rePassword'/>
            {registeform.touched.rePassword? <p className="text-danger">{registeform.errors.rePassword}</p>:""}

        </div>
        <div>
            <label className=' p-1' htmlFor="phone">phone :</label>
            <input onBlur={registeform.handleBlur} onChange={registeform.handleChange}  className='form-control' type="tel"  name='phone' id='phone'/>
            {registeform.touched.phone?<p className="text-danger"  >{registeform.errors.phone}</p>:""}

        </div>
      {loding ?<button type='button' className='btn btn-success ms-auto d-block'><i className="fa-solid fa-spinner fa-spin"></i></button>:<button disabled={!(registeform.isValid && registeform.dirty ) }   className='btn btn-success m-3 d-block ms-auto' type='submit'>Register</button>}

    </form>
  </div>
</div>
  </>
}
