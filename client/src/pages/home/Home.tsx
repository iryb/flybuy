import { CategoriesTabs } from "@/components/categoriesTabs/CategoriesTabs";
import { FullWidthCarousel } from "@/components/fullWidthCarousel/FullWidthCarousel";
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
  return (
    <div>
      <FullWidthCarousel slides={slides} />
      <CategoriesTabs />
      <Subscribe />
    </div>
  );
};
