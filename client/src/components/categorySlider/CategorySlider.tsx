import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import clsx from "clsx";
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
  title?: string;
  slides: CartItem[];
  loading?: boolean;
}

export const CategorySlider = ({
  title,
  slides,
  loading,
}: CategorySliderProps): React.ReactElement => {
  if (loading) return <p>Loading...</p>;

  return (
    <>
      {slides && (
        <Box className={styles.section}>
          {title && (
            <Typography variant="h3" className={styles.title}>
              {title}
            </Typography>
          )}
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            loop={false}
            breakpoints={{
              600: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
            className={styles.carousel}
          >
            {slides.map((slide) => (
              <SwiperSlide key={uuidv4()}>
                <ProductCard key={uuidv4()} item={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Container
            sx={{ position: "relative", height: "100%" }}
            className={styles.arrowsContainer}
          >
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
