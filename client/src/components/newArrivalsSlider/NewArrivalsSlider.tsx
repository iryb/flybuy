import React from "react";
import { CategorySlider } from "@components/categorySlider/CategorySlider";
import { Box } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/hooks";
import { ApiPath } from "@enums/apiPath";

export const NewArrivalsSlider = (): React.ReactElement => {
  const { t } = useTranslation();
  const { data, loading, error } = useFetch(
    `${ApiPath.ITEMSAPI}&filters[category][$eq]=newArrivals`,
  );

  return (
    <Box className="section">
      <Container>
        <CategorySlider
          title={t("newArrivalsTitle")}
          slides={data}
          loading={loading}
        />
      </Container>
    </Box>
  );
};
