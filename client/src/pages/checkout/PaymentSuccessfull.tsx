import { Typography, Box, Container } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

export const PaymentSuccessfull = (): React.ReactElement => {
  return (
    <Box sx={{ padding: "80px 0" }}>
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
          <Typography variant="h3">Payment sucessfull</Typography>
        </Box>
        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/">Go to Home page</Link>
        </Box>
      </Container>
    </Box>
  );
};
