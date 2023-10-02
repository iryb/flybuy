import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader = (): React.ReactElement => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};
