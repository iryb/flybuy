import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CartItem } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { formatPrice } from "@/helpers/helpers";
import { Quantity } from "@components/general/quantity/Quantity";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { removeFromCart } from "@/store/cart/slice";

import styles from "./styles.module.scss";

export const ProductListItem = (item: CartItem): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { name, price } = item.attributes;

  return (
    <Box>
      <Box className={styles.product}>
        <Box flex="1 1 40%">
          <img src="/" alt={name} />
        </Box>
        <Box flex="1 1 60%">
          <Box className={styles.productTop}>
            <Typography fontWeight="bold">{formatPrice(price)}</Typography>
            <IconButton
              onClick={() => dispatch(removeFromCart({ id: item.id }))}
            >
              <HighlightOffIcon />
            </IconButton>
          </Box>
          <Typography>{name}</Typography>
          <Quantity {...item} />
        </Box>
      </Box>
    </Box>
  );
};
