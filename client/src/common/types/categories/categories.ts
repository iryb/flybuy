import { Image } from "../types";

interface Category {
  attributes: {
    title: string;
    image: Image;
    link: string;
  };
}

interface Subcategory {
  title: string;
  items: string[];
}

interface CategoriesState {
  items: Category[];
  subcategories: Subcategory[];
}

export type { CategoriesState, Category };
