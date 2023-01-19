import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import './styles.css'

// import required modules
import { Navigation } from 'swiper'

export default () => {
  return (
    <>
      <Swiper
      
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Navigation]}
        
        className="h-36 w-full text-gray-700"
      >
        <SwiperSlide>
          <div id="template1" className="bg-[url('https://static.vecteezy.com/ti/vecteur-libre/p1/4684690-paix-dans-graffiti-art-gratuit-vectoriel.jpg')] bg-cover bg-center w-60 h-20 rounded-[48px] border border-black flex justify-center items-center hover:cursor-pointer">
            <p className="block bg-white rounded-3xl p-2">Template 1</p>
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div id="template2" className="bg-[url('https://static.standaard.be/Assets/Images_Upload/2017/07/13/c5d28dac-67b9-11e7-8c3c-11de46a62a49.jpg?width=1152&format=jpg')] bg-cover bg-center w-60 h-20 rounded-[48px] border border-black flex justify-center items-center hover:cursor-pointer">
            <p className="block bg-white rounded-3xl p-2">Template 2</p>
          </div>
        </SwiperSlide> 
        <SwiperSlide >
          <div id="template3" className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdNIqmDF7sBA0V7GmkbElkuXFbRO-KRGUimhIWlaH7X3zZOvAjv7b3sTCZ6G0GPJsp_A&usqp=CAU')] bg-cover bg-center w-60 h-20 rounded-[48px] border border-black flex justify-center items-center hover:cursor-pointer">
            <p className="block bg-white rounded-3xl p-2">Template 3</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}
