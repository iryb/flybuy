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
import clsx from "clsx";
import emptyCartImg from "@images/shopping-bag.png";

export const MiniCart = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.count * item.attributes.price;
    return sum + price;
  }, 0);

  if (totalPrice === 0) {
    return (
      <Box
        className={clsx(
          styles.miniCartBg,
          styles.miniCartContainer,
          styles.miniCartEmpty,
          isCartOpen ? styles.active : "",
        )}
      >
        <Box className={styles.miniCart}>
          <Box className={styles.miniCartInner}>
            <Box className={styles.miniCartContent}>
              <Box className={styles.miniCartHeader}>
                <Typography variant="h4">Basket</Typography>
                <IconButton onClick={() => dispatch(setIsCartOpen())}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box className={styles.emptyCartContent}>
                <img
                  src={emptyCartImg}
                  alt="Empty cart"
                  className={styles.emptyCartImage}
                />
                <Typography>Your basket is still empty.</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className={clsx(
        styles.miniCartBg,
        styles.miniCartContainer,
        isCartOpen ? styles.active : "",
      )}
    >
      <Box className={styles.miniCart}>
        <Box className={styles.miniCartInner}>
          <Box className={styles.miniCartContent}>
            <Box className={styles.miniCartHeader}>
              <Typography variant="h4">Basket ({cart.length})</Typography>
              <IconButton onClick={() => dispatch(setIsCartOpen())}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className={styles.miniCartItems}>
              {cart.map((item) => (
                <ProductListItem key={item.id} {...item} />
              ))}
            </Box>
          </Box>
          <Box className={styles.miniCartFooter}>
            <Divider />
            <Box mt="20px">
              <Box className={styles.totalContainer}>
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
