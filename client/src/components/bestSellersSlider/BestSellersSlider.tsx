import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";

export const BestSellersSlider = (): React.ReactElement => {
  const items = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const bestSellers = items.filter(
    (item) => item.attributes.category === "bestSellers",
  );

  return (
    <>
      {bestSellers && (
        <Box>
          <Container>
            <CategorySlider
              title={t("bestSellersTitle")}
              slides={bestSellers}
            />
          </Container>
        </Box>
      )}
    </>
  );
};
