import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import ContainerDetails from "../../book/shildren/ContainerDetails";

export default function SwipperContainer({ books, categorys }) {
    console.log(books,categorys)
  return (
    <>
      <Swiper
        effect={"flip"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper"
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {books.map((b) => (
          <SwiperSlide key={b._id}>
            <ContainerDetails categorys={categorys} book={b} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
