import { Typography, Box, Container } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PaymentSuccessfull = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Box className="page alignCenter">
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <CheckCircleIcon sx={{ color: "green", fontSize: "40px" }} />
          <Typography variant="h3">{t("paymentSuccessfull")}</Typography>
        </Box>
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/">{t("goToHome")}</Link>
        </Box>
      </Container>
    </Box>
  );
};
