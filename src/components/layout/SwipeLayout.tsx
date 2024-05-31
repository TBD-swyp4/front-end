import styled from 'styled-components';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type SwipeLayoutProps = {
  children: React.ReactNode;
};

const SwipeLayout = ({ children }: SwipeLayoutProps) => {
  return (
    <StyledSwiper
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper">
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>
          <ContentContainer>{child}</ContentContainer>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  );
};

export default SwipeLayout;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  width: 100%;
  background-color: transparent;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background-color: #9f9f9f;
  }

  .swiper-pagination-bullet-active {
    background-color: #9f9f9f;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: #dddddd;
    width: 30px;
    height: 30px;
    opacity: 0.7;
    border-radius: 50%;
    overflow: visible;
    &::after {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      border-top: 2px solid #9f9f9f;
      border-right: 2px solid #9f9f9f;
      transform: translate(-50%, -50%) rotate(-135deg);
      position: absolute;
      top: 50%;
      left: 50%;
    }
  }

  .swiper-button-disabled {
    display: none;
  }

  .swiper-button-prev {
    left: 5px;
  }

  .swiper-button-next {
    right: 5px;
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
`;

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  padding-bottom: 30px;
`;
