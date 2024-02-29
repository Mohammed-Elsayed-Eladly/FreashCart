import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CartContext = createContext() 
export default function CartContextProvider (props){


    useEffect(()=>{

        async function gitData () {
        let {data} =await getAllCartData()
        setCartCount(data.numOfCartItems)
        setSearchQurey(data)
        } 

        gitData ()
        search ()


    },[])



    function search (){
        searchQurey?.filter((val)=>{
            console.log(val);
        })
    }

    let[searchQurey,setSearchQurey] = useState(null)

    let [cartCount ,setCartCount] = useState()


    let[errorCart,setErrorCart] = useState()


    let headerData={
        token:localStorage.getItem("userToken")
    }


    function updateProductQuantany(id,count){
        let body = {
            "count": count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body,{
            headers:headerData
        })
    }



    function deletCartData(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:headerData
        })
    }


    function deletAllCartData(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headerData
        })
    }


    function getAllCartData(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headerData
        }).catch((err)=>{
            setErrorCart(err)
            
        })


    }

    function addCart(id){
        let body = {
            "productId": id
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,body,{
            headers:headerData
        })
    }


  


    function checkPayment(id,shippingData){

        let body ={
            shippingAddress:shippingData
        }

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/`,body,{
            headers:headerData
        })
    }


    function addWishlist(id){
        let body = {
            "productId": id
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,body,{
            headers:headerData
        })
    }



    function getAllwishtData(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers:headerData
        })
    }



    function deletWishListData(id){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:headerData
        })
    }


    function gitAllBrand(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }



    function gitAllCatigores(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }



    return <CartContext.Provider value={{errorCart,gitAllCatigores,gitAllBrand,deletWishListData,getAllwishtData,addWishlist,cartCount,setCartCount,checkPayment,addCart ,getAllCartData ,deletCartData,updateProductQuantany,deletAllCartData,}}>
        {props.children}
    </CartContext.Provider>

}

