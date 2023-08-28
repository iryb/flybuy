import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React from "react";
import { setIsCartOpen } from "@/store/cart/slice";
import { ProductListItem } from "../productListItem/ProductListItem";
import { formatPrice } from "@/helpers/helpers";
import { useNavigate } from "react-router-dom";
import { ApiPath } from "@/common/enums/apiPath";
import clsx from "clsx";
import emptyCartImg from "@images/shopping-bag.png";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const MiniCart = (): React.ReactElement => {
  const { t } = useTranslation();
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
                <Typography variant="h4">{t("miniCartTitle")}</Typography>
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
                <Typography>{t("miniCartEmptyText")}</Typography>
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
              <Typography variant="h4">
                {t("miniCartTitle")} ({cart.length})
              </Typography>
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
                  {t("miniCartTotal")}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>
              <Button
                className={styles.checkoutBtn}
                onClick={() => navigate(ApiPath.CHECKOUT)}
              >
                {t("checkout")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
