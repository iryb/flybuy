import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ApiPath } from "@enums/apiPath";
import { setItems } from "@store/cart/slice";
import { CategoriesBlocks } from "@/components/categoriesBlocks/CategoriesBlocks";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
import { NewArrivalsSlider } from "@/components/newArrivalsSlider/NewArrivalsSlider";
import { BestSellersSlider } from "@/components/bestSellersSlider/BestSellersSlider";
import { Subscribe } from "@/components/subscribe/Subscribe";
import { fetchBannerSlides } from "@store/banner/slice";

export const Home = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.settings.language);

  async function getItems(language: string): Promise<void> {
    const items = await fetch(`${ApiPath.ITEMSAPI}&locale=${language}`, {
      method: "GET",
    });
    const itemsData = await items.json();
    dispatch(setItems(itemsData.data));
    return itemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems(language);
  }, [language]);

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
