"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { Box, Typography } from "@mui/material";

const reviews = [
  {
    author: "Daniel",
    title: "Excellent customer service",
    content:
      "Alex Bailey is my main point of contact and always provides excellent support.",
    date: "2 weeks ago",
  },
  {
    author: "Jerry",
    title: "Amazing service",
    content:
      "Quick response and fast quotation. Very professional team.",
    date: "2 weeks ago",
  },
  {
    author: "Paulo",
    title: "Smooth experience",
    content:
      "Everything was seamless and delivery was fast.",
    date: "3 weeks ago",
  },
  {
    author: "Gary",
    title: "Fast delivery",
    content:
      "Got the exact part within a short time. Great support.",
    date: "1 month ago",
  },
];

export default function ReviewSlider() {
  return (
    <>
      {/* HEADER */}
      <div className="section_container reviews-header">
        <div>
          <h2>Customer Reviews</h2>
          <p>Trusted by engineers worldwide</p>
        </div>

        {/* NAV BUTTONS */}
        <div className="reviews-nav">
          <button className="reviews-prev">←</button>
          <button className="reviews-next">→</button>
        </div>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".reviews-prev",
          nextEl: ".reviews-next",
        }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <Box className="review-card">
              <div className="stars">★★★★★</div>

              <h3>{r.title}</h3>

              <p className="review-text">{r.content}</p>

              <div className="review-footer">
                <span>{r.author}</span>
                <span>{r.date}</span>
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}