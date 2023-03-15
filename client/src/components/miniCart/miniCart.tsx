import { CartItem } from "@/common/types/types";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React from "react";
import styles from "./styles.module.scss";
import { setIsCartOpen } from "@/store/cart/slice";
import { ProductListItem } from "../productListItem/ProductListItem";

export const MiniCart = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart) as CartItem[];
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);

  return (
    <Box display={isCartOpen ? "block" : "none"} className={styles.miniCartBg}>
      <Box className={styles.miniCart}>
        <Box className={styles.miniCartInner}>
          <Box textAlign="right">
            <IconButton onClick={() => dispatch(setIsCartOpen())}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h4">Basket ({cart.length})</Typography>
          <Box>
            {cart.map((item) => (
              <ProductListItem key={item.id} {...item} />
            ))}
          </Box>
          <Box m="20px 0"></Box>
        </Box>
      </Box>
    </Box>
  );
};
