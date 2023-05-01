import React, { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { ApiPath } from "@enums/apiPath";
import { setItems } from "@store/cart/slice";
import { CategoriesBlocks } from "@/components/categoriesBlocks/CategoriesBlocks";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
import { NewArrivalsSlider } from "@/components/newArrivalsSlider/NewArrivalsSlider";
import { BestSellersSlider } from "@/components/bestSellersSlider/BestSellersSlider";
import { Subscribe } from "@/components/subscribe/Subscribe";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Spring Sale",
    link: "/sale",
  },
  {
    image:
      "https://images.unsplash.com/photo-1612731486606-2614b4d74921?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80",
    title: "Spring Sale",
    link: "/sale",
  },
  {
    image:
      "https://images.unsplash.com/photo-1538330627166-33d1908c210d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
];

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

  return (
    <div>
      <FullWidthCarousel slides={slides} />
      <NewArrivalsSlider />
      <CategoriesBlocks />
      <BestSellersSlider />
      <Subscribe />
    </div>
  );
};
