import React from "react";
import { Box, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { Container } from "@mui/system";
import clsx from "clsx";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CartItem } from "@/common/types/types";
import { ProductCard } from "@components/productCard/ProductCard";
import { CategorySliderSkeleton } from "./CategorySliderSkeleton";

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
  return (
    <>
      <Box className={styles.section}>
        {title && (
          <Typography variant="h3" className={styles.title}>
            {title}
          </Typography>
        )}

        {loading ? (
          <CategorySliderSkeleton />
        ) : (
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
            {slides?.map((slide, index) => (
              <SwiperSlide key={index}>
                <ProductCard item={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <Container
          sx={{ position: "relative", height: "100%" }}
          className={styles.arrowsContainer}
        >
          <IconButton className={clsx("swiper-button-prev", styles.arrowPrev)}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton className={clsx("swiper-button-next", styles.arrowNext)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Container>
      </Box>
    </>
  );
};
