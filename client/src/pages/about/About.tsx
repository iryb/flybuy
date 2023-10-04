import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export const About = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Box className="page alignCenter">
      <Container>
        <Typography variant="h1" className="pageTitle">
          {t("aboutPageTitle")}
        </Typography>
        <Typography className="textFormatted">{t("aboutPageText")}</Typography>
      </Container>
    </Box>
  );
};
