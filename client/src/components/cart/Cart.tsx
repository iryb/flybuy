import React from "react";
import { formatPrice } from "@/helpers/helpers";
import { useAppSelector } from "@/store/hooks";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Coupon } from "@components/general/coupon/Coupon";
import { ProductListItem } from "@components/productListItem/ProductListItem";

import styles from "./styles.module.scss";

export const Cart = (): React.ReactElement => {
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart.cart);

  const totalPrice = cart.reduce((sum, item) => {
    const price = item.count * item.price;
    return sum + price;
  }, 0);
  return (
    <>
      <Box className={styles.cartItems}>
        {cart.map((item) => (
          <ProductListItem
            key={`${item.id}-${item.size}`}
            product={item}
            smallImage={true}
          />
        ))}
      </Box>
      <Divider sx={{ marginTop: "15px", marginBottom: "30px" }} />
      <Box className={styles.cartFooter}>
        <Box className={styles.total}>
          <Typography variant="h5" fontWeight="bold">
            {t("miniCartTotal")}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatPrice(totalPrice)}
          </Typography>
        </Box>
        <Coupon className={styles.coupon} />
      </Box>
    </>
  );
};
