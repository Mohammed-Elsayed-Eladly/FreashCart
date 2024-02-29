import imgslide1 from "../../assets/images/images/slider-image-1.jpeg"
import imgslide2 from "../../assets/images/images/slider-image-2.jpeg"
import imgslide3 from "../../assets/images/images/slider-image-3.jpeg"


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function MinSlider() {
  return <>
  
  <div className="container">
    <div className="row g-0">
        <div className="col-md-9">




        <OwlCarousel className='owl-theme' autoplay autoplayTimeout={6000} items={1} loop dots={false}>
    <div className='item'>
    <img className="w-100 mainImge" src={imgslide1} alt="" />
    </div>
    <div className='item'>
    <img className="w-100 mainImge" src={imgslide2} alt="" />
    </div>
    <div className='item'>
    <img className="w-100 mainImge" src={imgslide3} alt="" />
    </div>
</OwlCarousel>




        
        </div>
        <div className="col-md-3">
        <img className="w-100 scImge" src={imgslide1} alt="" />
        <img className="w-100 scImge" src={imgslide2} alt="" />

        </div>
    </div>
  </div>
  
  </>
}
