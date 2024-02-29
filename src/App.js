import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from "./layout/Layout.jsx"
import Home from "./component/home/Home.jsx"
import Login from './component/login/Login.jsx'
import Regester from './component/regester/Regester.jsx'
import jwtDecode from 'jwt-decode'
import ProtectedRouter from './ProtectedData.jsx'
import Notfound from './component/notfound/Notfound.jsx'
import ForgotPassowrd from './component/forgotpassword/ForgotPassowrd.jsx'
import MessageCode from './component/MessageCode/MessageCode.jsx'
import ResetPassword from './component/resetPassword/ResetPassword.jsx'
import Product from './component/product/Product.jsx'
import ProductDetelse from './component/productDetelse/ProductDetelse.jsx'
import Brand from './component/Brand/Brand.jsx'
import CartContextProvider from './context/CartContext.js'
import Cart from './component/Catr/Cart.jsx'
import CheckOut from './component/CheckOut/CheckOut.jsx'
import WishList from './component/whishlest/WishList.jsx'
import Catigores from './component/catigory/Catigores.jsx'



export default function App() {

    let [userdata,setuserdata] =useState(null)
    function savedata(data){
      setuserdata(data)
    }

   

    // stop back for refresh

    useEffect(()=>{
      if(localStorage.getItem("userToken") ){
        let token = localStorage.getItem('userToken')
        let data =jwtDecode(token)
        savedata(data)
      }
    },[])
 




  function Logout(){
    savedata(null)
    localStorage.removeItem("userToken")
    return  <Navigate to='/login'/>
  }




  let routers=createHashRouter([
    {path:'/',element:<Layout Logout={Logout} userdata={userdata}/>,children:[
      {path:'home',element:<ProtectedRouter> <Home userdata={userdata}/> </ProtectedRouter>    },
      {path:'product',element:<ProtectedRouter> <Product/> </ProtectedRouter> },
      {path:'Brand',element: <ProtectedRouter> <Brand/> </ProtectedRouter> },
      {path:'CheckOut/:id',element: <ProtectedRouter> <CheckOut/> </ProtectedRouter> },
      {path:'ProductDetelse/:id',element: <ProtectedRouter> <ProductDetelse/> </ProtectedRouter> },
      {path:'cart',element: <ProtectedRouter> <Cart/> </ProtectedRouter>}, 
      {path:'wishList',element: <ProtectedRouter> <WishList/> </ProtectedRouter>}, 
      {path:'brand',element: <ProtectedRouter> <Brand/> </ProtectedRouter>}, 
      {path:'catigores',element: <ProtectedRouter> <Catigores/> </ProtectedRouter>}, 
      {path:'ForgotPassowrd',element: <ForgotPassowrd />  },
      {path:'MessageCode',element: <MessageCode/>  },
      {path:'ResetPassword',element: <ResetPassword/>  },
      {path:'login',element:<Login savedata={savedata}/>},
      {path:"regester",element:<Regester/>},
      {index:true,element:<Regester/>},
      {path:"*" ,element:<Notfound/>}

    ]}
  ])



  return <>


<CartContextProvider>
  <RouterProvider router={routers}/>
</CartContextProvider>
  </>
}
