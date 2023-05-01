import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const NewArrivalsSlider = (): React.ReactElement => {
  const items = useAppSelector((state) => state.cart.items);

  const newArrivals = items.filter(
    (item) => item.attributes.category === "newArrivals",
  );

  return (
    <>
      {newArrivals && (
        <Box>
          <Container>
            <Typography variant="h3">New Arrivals</Typography>
            <CategorySlider slides={newArrivals} />
          </Container>
        </Box>
      )}
    </>
  );
};
