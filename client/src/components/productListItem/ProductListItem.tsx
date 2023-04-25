import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { CartItem } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { formatPrice } from "@/helpers/helpers";
import { Quantity } from "@components/general/quantity/Quantity";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "@/store/cart/slice";
import { ApiPath } from "@enums/apiPath";

import styles from "./styles.module.scss";

export const ProductListItem = (item: CartItem): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { name, price, image } = item.attributes;
  const { count } = item;

  return (
    <Box>
      <Box className={styles.product}>
        <Box flex="1 1 40%" className={styles.leftCol}>
          <img
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            src={`${ApiPath.ROOT}${image.data?.attributes.formats.medium.url}`}
            alt={name}
            className={styles.productImage}
          />
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
          <Quantity
            callbackDecrease={() => dispatch(decreaseCount({ ...item, count }))}
            callbackIncrease={() => dispatch(increaseCount({ ...item, count }))}
            quantity={count}
          />
        </Box>
      </Box>
    </Box>
  );
};
