import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export const NotFound = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Box className="page alignCenter" sx={{ textAlign: "center" }}>
      <Container>
        <Typography variant="h1" className="pageTitle">
          {t("pageNotFoundTitle")}
        </Typography>
        <Typography>{t("pageNotFoundText")}</Typography>
      </Container>
    </Box>
  );
};
