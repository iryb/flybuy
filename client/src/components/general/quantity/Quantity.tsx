import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "@store/hooks";
import { decreaseCount, increaseCount } from "@/store/cart/slice";
import { CartItem } from "@/common/types/types";

import styles from "./styles.module.scss";

export const Quantity = (item: CartItem): React.ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <Box className={styles.quantity}>
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
          <RemoveIcon />
        </IconButton>
        <Typography p="10px">{item.count}</Typography>
        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
