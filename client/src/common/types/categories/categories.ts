interface Category {
  attributes: {
    title: string;
    image: {
      data: {
        attributes: { formats: { medium: { url: string } } };
      } | null;
    };
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
