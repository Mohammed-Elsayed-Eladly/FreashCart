import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import {useNavigate} from "react-router-dom"

export default function MessageCode() {

    let[error,setError]=useState('')
    let basUrl="https://ecommerce.routemisr.com"
    let nav=useNavigate()
    let [loding,setloding]=useState(false)
    let validationSchema =Yup.object({
        resetCode:Yup.string().required("code required").matches(/^[0-9]{0,10}$/,"enter right code"),
    })


    let sendCode=useFormik({
        initialValues:{
            resetCode:""
        },
        validationSchema
        ,onSubmit:csendCoseMessage
    })

    async function csendCoseMessage (code){
        setloding(true)
        let {data} = await axios.post(`${basUrl}/api/v1/auth/verifyResetCode`,code).catch((err)=>{
            // console.log(err.response.data.message);
            setError(err.response.data.message)
            setloding(false)
        })
        setloding(false)

        if(data.status == "Success"){
            nav("/ResetPassword")
        }

    }
    return <>


<div className="container">

<h3 className='py-5'>forget passowrd</h3>


{error == "" ? null : <div className="alert alert-danger">{error}</div>}

<form onSubmit={sendCode.handleSubmit}>

<div className='py-3'><label className='py-1' htmlFor="resetCode">enter code</label>
<input  onChange={sendCode.handleChange}  className='form-control' type="tel" name='resetCode' id='resetCode' />
<p className='text-danger'>{sendCode.errors.resetCode}</p>
</div>


{loding ? <button type='button' className='btn btn-success ms-auto d-block'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button disabled={!(sendCode.isValid && sendCode.dirty)} type='submit' className='btn btn-success ms-auto d-block'>send</button>
        }
        
</form>
</div>

    </>
}
