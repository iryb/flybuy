import React from "react";
import { CategoriesBlocks } from "@/components/categoriesBlocks/CategoriesBlocks";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
import { NewArrivalsSlider } from "@/components/newArrivalsSlider/NewArrivalsSlider";
import { BestSellersSlider } from "@/components/bestSellersSlider/BestSellersSlider";
import { Subscribe } from "@/components/subscribe/Subscribe";
import { Notification } from "@/components/notification/Notification";

export const Home = (): React.ReactElement => {
  return (
    <>
      <Notification />
      <FullWidthCarousel />
      <NewArrivalsSlider />
      <CategoriesBlocks />
      <BestSellersSlider />
      <Subscribe />
    </>
  );
};
