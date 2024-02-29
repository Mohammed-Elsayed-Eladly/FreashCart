import * as Yup from "yup"
import {useFormik} from "formik"
import axios from "axios"
import { useState } from "react"
import {useNavigate} from "react-router-dom"

export default function ResetPassword() {

  let nav =useNavigate()
  let [loding,setloding]=useState(false)
  let [errorMessage,setmessage] = useState("")

  let basurl="https://ecommerce.routemisr.com"

let validationSchema =Yup.object({
  email:Yup.string().required("code required").email("enter valid email"),
  newPassword:Yup.string().required('password required').matches(/^[A-Z][a-z1-9]{5,20}$/,"enter valid password")
})



  let ResetPassword = useFormik({
    initialValues:{
      email:"",
      newPassword:""
    },
validationSchema,
onSubmit:comfirmPassword,

  })


  async  function comfirmPassword(value){
    setloding(true)
  let {data} = await axios.put(`${basurl}/api/v1/auth/resetPassword`,value).catch((err)=>{
    setmessage(err.response.data.message)
    setloding(false)

  })
  setloding(false)

  if(data.token){
    nav("/login")
  }
}




  return <>
  
  <div className="container">


  <div className="py-5">
    <h2 className="fw-border">ResetPassword</h2>
  </div>
  {errorMessage == "" ? null: <div className="alert alert-danger">{errorMessage}</div>}
    <form onSubmit={ResetPassword.handleSubmit}>


      <div className="py-3">
      <label className="py-1" htmlFor="email">email :</label>
      <input onBlur={ResetPassword.handleBlur} onChange={ResetPassword.handleChange} className="form-control" type="email" name="email" id="email" />
      {ResetPassword.touched.email ? <p className="text-danger">{ResetPassword.errors.email}</p> :""}
      </div>

      <div className="py-2">
      <label className="py-1" htmlFor="newPassword">NewPassword :</label>
      <input onBlur={ResetPassword.handleBlur} onChange={ResetPassword.handleChange} className="form-control" type="password" name="newPassword" id="newPassword" />
      {ResetPassword.touched.newPassword ? <p className="text-danger">{ResetPassword.errors.newPassword}</p> :""}
      </div>

      {loding ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(ResetPassword.isValid && ResetPassword.dirty)} type='submit' className='btn btn-success ms-auto d-block'>ResetPassword</button>
        }



    </form>
  </div>
  
  </>
}
