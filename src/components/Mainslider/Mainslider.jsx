import React from 'react'
import style from './Mainslider.module.css'
import slider1 from './../../assets/Slider1.png'
import slider2 from './../../assets/Slider2.png'
import slider3 from './../../assets/Slider3.png'
import slider4 from './../../assets/Slider4.png'
import slider5 from './../../assets/Slider5.png'
import slider6 from './../../assets/Slider6.png'
import slider7 from './../../assets/Slider7.png'
import slider8 from './../../assets/Slider8.png'
import Slider from 'react-slick'
export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
      };
  return (
    <>
    <div className='container mx-auto my-10'>
    
    
    <div className='w-full object-fill'>
    <Slider {...settings}>
      <img src={slider1} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg ' alt="slider1" />
      <img src={slider2} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg' alt="slider2" />
      <img src={slider3} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg'alt="slider3" />
      <img src={slider4} className=" h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg" alt="slide4" />
      <img src={slider5} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg' alt="slider5" />
      <img src={slider6} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg' alt="slider6" />
      <img src={slider7}  className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg'alt="slider7" />
      <img src={slider8} className='h-40 sm:h-60 md:h-80 lg:h-96 xl:h-[450px] w-full object-cover rounded-lg' alt="slider" />
   
    
     </Slider>
     </div>
   
    </div>
    
   
     
    
    </>
  )
}
