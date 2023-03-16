import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";

import styles from "./styles.module.scss";

interface QuantityProps {
  callbackDecrease: CallableFunction;
  callbackIncrease: CallableFunction;
  quantity?: number;
}

export const Quantity = ({
  callbackDecrease,
  callbackIncrease,
  quantity,
}: QuantityProps): React.ReactElement => {
  return (
    <Box className={styles.quantity}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => callbackDecrease()}>
          <RemoveIcon />
        </IconButton>
        <Typography p="10px">{quantity ?? 1}</Typography>
        <IconButton onClick={() => callbackIncrease()}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
