import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CategoriesBlocks } from "@/components/categoriesBlocks/CategoriesBlocks";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
import { NewArrivalsSlider } from "@/components/newArrivalsSlider/NewArrivalsSlider";
import { BestSellersSlider } from "@/components/bestSellersSlider/BestSellersSlider";
import { Subscribe } from "@/components/subscribe/Subscribe";
import { fetchBannerSlides } from "@store/banner/slice";

export const Home = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchBannerSlides());
  }, [language]);

  return (
    <div>
      <FullWidthCarousel />
      <NewArrivalsSlider />
      <CategoriesBlocks />
      <BestSellersSlider />
      <Subscribe />
    </div>
  );
};
