import React from "react";
import { CategoriesBlocks } from "@/components/categoriesBlocks/CategoriesBlocks";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
import { NewArrivalsSlider } from "@/components/newArrivalsSlider/NewArrivalsSlider";
import { BestSellersSlider } from "@/components/bestSellersSlider/BestSellersSlider";
import { Subscribe } from "@/components/subscribe/Subscribe";

export const Home = (): React.ReactElement => {
  return (
    <>
      <FullWidthCarousel />
      <NewArrivalsSlider />
      <CategoriesBlocks />
      <BestSellersSlider />
      <Subscribe />
    </>
  );
};
