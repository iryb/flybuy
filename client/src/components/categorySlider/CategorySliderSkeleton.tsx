import { Grid } from "@mui/material";
import { ProductCardSkeleton } from "@components/productCard/ProductCardSkeleton";

export const CategorySliderSkeleton = (): React.ReactElement => (
  <Grid container wrap="nowrap" sx={{ gap: "17px" }}>
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </Grid>
);
