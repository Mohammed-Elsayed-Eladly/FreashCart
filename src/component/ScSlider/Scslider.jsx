
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useEffect, useState } from 'react';
import axios from 'axios';




export default function Scslider() {


  let[productSlider,setProductSlider] = useState([])

  let basUrl =`https://ecommerce.routemisr.com`

  useEffect(()=>{


    scSlider()
  },[])


async function scSlider(){
  let{data}=await axios.get(`${basUrl}/api/v1/categories`)
  setProductSlider(data.data)
}



  return <>
    
<div className="container">
  <div className="row">
  <OwlCarousel className='owl-theme' autoplay autoplayTimeout={3000} items={8} loop >
          {productSlider.map((val)=>{
              return<>
              <div className='item'>
              <img  className='w-100 ScSlider'  src={val.image} alt="" />
              </div>
            </>
          })}
        </OwlCarousel>
  </div>
</div>

  </>
}
