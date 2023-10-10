import React from "react";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Container, Typography } from "@mui/material";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const FullWidthCarousel = (): React.ReactElement => {
  const navigate = useNavigate();
  const slides = useAppSelector((state) => state.banner.data);
  const { t } = useTranslation();

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
      {slides?.map(({ image, title, link }) => (
        <SwiperSlide key={uuidv4()}>
          <img
            className={styles.carouselImage}
            src={`${process.env.REACT_APP_IMAGE_ROOTURL as string}${image}`}
            alt=""
          />
          <Container sx={{ position: "relative", height: "100%" }}>
            {(title ?? link) && (
              <Box className={styles.carouselCaption}>
                {title && (
                  <Typography variant="h3" className={styles.title}>
                    {title}
                  </Typography>
                )}
                {link && (
                  <Button onClick={() => navigate(link)} variant="text">
                    {t("generalBtnText")}
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
