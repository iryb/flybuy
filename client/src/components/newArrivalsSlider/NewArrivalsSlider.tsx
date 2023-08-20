import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { useAppSelector } from "@/store/hooks";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";

export const NewArrivalsSlider = (): React.ReactElement => {
  const items = useAppSelector((state) => state.cart.items);
  const { t } = useTranslation();

  const newArrivals = items.filter(
    (item) => item.attributes.category === "newArrivals",
  );

  return (
    <>
      {newArrivals && (
        <Box className="section">
          <Container>
            <CategorySlider
              title={t("newArrivalsTitle")}
              slides={newArrivals}
            />
          </Container>
        </Box>
      )}
    </>
  );
};
