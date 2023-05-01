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

interface CategoriesState {
  items: Category[];
}

export type { CategoriesState, Category };
