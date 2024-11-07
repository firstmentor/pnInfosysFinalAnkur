/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

export default function BannerPlainSwiper({ data }) {
    return (
        <>
            <Swiper 
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay, FreeMode, Pagination]}
                className="mySwiper"
            >
                {
                    Array?.isArray(data) && data?.length > 0 && data?.map((val,key)=>(
                        <SwiperSlide key={key} style={{ background: 'rgb(2,0,36)', background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)' }}>
                            <img src={val?.mainBannerImageUrl} alt={val?.mainBannerImageUrl} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}