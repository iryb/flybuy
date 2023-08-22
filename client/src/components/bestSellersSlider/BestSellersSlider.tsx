import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { ApiPath } from "@enums/apiPath";
import useFetch from "@/hooks/hooks";

export const BestSellersSlider = (): React.ReactElement => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(
    `${ApiPath.ITEMSAPI}&filters[category][$eq]=bestSellers`,
  );

  return (
    <Box>
      <Container>
        <CategorySlider
          title={t("bestSellersTitle")}
          slides={data}
          loading={loading}
        />
      </Container>
    </Box>
  );
};
