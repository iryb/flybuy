import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
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

  async function getItems(): Promise<void> {
    const items = await fetch(ApiPath.ITEMSAPI, {
      method: "GET",
    });
    const itemsData = await items.json();
    dispatch(setItems(itemsData.data));
    return itemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchBannerSlides());
  }, []);

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
