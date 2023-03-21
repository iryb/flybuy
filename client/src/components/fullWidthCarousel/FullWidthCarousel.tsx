import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";

interface Slide {
  image: string;
  title?: string;
  link?: string;
}

interface FullWidthCarouselProps {
  slides: Slide[];
}

export const FullWidthCarousel = ({
  slides,
}: FullWidthCarouselProps): React.ReactElement => {
  const navigate = useNavigate();

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: "swiper-button-disabled",
      }}
      loop={true}
      autoplay
      className={styles.carousel}
    >
      {slides.map(({ image, title, link }) => (
        <SwiperSlide key={uuidv4()}>
          <img className={styles.carouselImage} src={image} alt="" />
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
            {(title ?? link) && (
              <Box className={styles.carouselCaption}>
                {title && (
                  <Typography variant="h3" className={styles.title}>
                    {title}
                  </Typography>
                )}
                {link && (
                  <Button onClick={() => navigate(link)} variant="text">
                    Learn More
                  </Button>
                )}
              </Box>
            )}
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};