import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const BestSellersSlider = (): React.ReactElement => {
  const items = useAppSelector((state) => state.cart.items);

  const bestSellers = items.filter(
    (item) => item.attributes.category === "bestSellers",
  );

  return (
    <>
      {bestSellers && (
        <Box>
          <Container>
            <Typography variant="h3">Best Sellers</Typography>
            <CategorySlider slides={bestSellers} />
          </Container>
        </Box>
      )}
    </>
  );
};
