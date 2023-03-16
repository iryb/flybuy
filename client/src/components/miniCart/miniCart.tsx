import { CartItem } from "@/common/types/types";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React from "react";
import styles from "./styles.module.scss";
import { setIsCartOpen } from "@/store/cart/slice";
import { ProductListItem } from "../productListItem/ProductListItem";
import { formatPrice } from "@/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { ApiPath } from "@/common/enums/apiPath";

export const MiniCart = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart) as CartItem[];
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.count * item.price,
    0,
  );

  return (
    <Box display={isCartOpen ? "block" : "none"} className={styles.miniCartBg}>
      <Box className={styles.miniCart}>
        <Box className={styles.miniCartInner}>
          <Box className={styles.miniCartContent}>
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
          </Box>
          <Box className={styles.miniCartFooter}>
            <Divider />
            <Box mt="20px">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h5" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>
              <Button
                className={styles.checkoutBtn}
                onClick={() => navigate(ApiPath.CHECKOUT)}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
