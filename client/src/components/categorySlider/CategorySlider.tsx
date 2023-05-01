import React from "react";
import { Box, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CartItem } from "@/common/types/types";
import { ProductCard } from "@components/productCard/ProductCard";

import styles from "./styles.module.scss";

interface CategorySliderProps {
  slides: CartItem[];
}

export const CategorySlider = ({
  slides,
}: CategorySliderProps): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      {slides && (
        <Box className={styles.section}>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={15}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            loop={false}
            className={styles.carousel}
          >
            {slides.map((slide) => (
              <SwiperSlide key={uuidv4()}>
                <ProductCard key={uuidv4()} item={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Container sx={{ position: "relative", height: "100%" }}>
            <IconButton
              className={clsx("swiper-button-prev", styles.arrowPrev)}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              className={clsx("swiper-button-next", styles.arrowNext)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Container>
        </Box>
      )}
    </>
  );
};
