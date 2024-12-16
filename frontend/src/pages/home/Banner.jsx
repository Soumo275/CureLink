import React from 'react'

import bannerImg from "../../assets/banner.png" 

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="Medicine Shopping" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Shop Your Medicine Online</h1>
            <p className='mb-10'>Browse a wide range of medicines, from common over-the-counter medications to specialized treatments. Fast delivery, best prices, and trusted brands right at your fingertips.</p>

            <button className='btn-primary'>Start Shopping</button> 
        </div>
    </div>
  )
}

export default Banner;
