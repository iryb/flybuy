import React, { useState } from "react";
import { addToCart } from "@store/cart/slice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { CartItem } from "@/common/types/types";
import { Box, Button, Typography } from "@mui/material";
import {
  formatPrice,
  formatStringCapitalize,
  getProductImage,
} from "@helpers/helpers";
import { Sizes } from "../general/sizes/Sizes";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

interface ProductCardProps {
  item: CartItem;
}

export const ProductCard = ({ item }: ProductCardProps): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [choseSize, setChoseSize] = useState<string>();
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const { id } = item;
  const { price, name, category, size } = item.attributes;

  const handleAddToCart = (): void => {
    if (!choseSize) {
      setError(t("chooseSizeError"));
      return;
    } else {
      setError("");
    }
    dispatch(addToCart({ ...item, count: 1 }));
  };

  const handleSizeClick = (s: string): void => {
    setError("");
    setChoseSize(s);
  };

  return (
    <Box>
      <Box className={styles.card}>
        <Box>
          <Box className={styles.cardHeader}>
            <img
              src={getProductImage(item.attributes.image)}
              alt={name}
              width="300"
              height="400"
              className={styles.cardImage}
              onClick={() => navigate(`/item/${id}`)}
            />
            <Box className={styles.cardButtonWrapper}>
              {error && (
                <Typography className={styles.error}>{error}</Typography>
              )}
              {size && (
                <Box className={styles.sizesContainer}>
                  <Sizes items={size.data} callback={handleSizeClick} />
                </Box>
              )}
              <Button onClick={handleAddToCart}>{t("addToCardText")}</Button>
            </Box>
          </Box>
          {category && (
            <Typography className={styles.category}>
              {formatStringCapitalize(category)}
            </Typography>
          )}
          <Typography variant="h5" className={styles.title}>
            <Link to={`/item/${id}`}>{name}</Link>
          </Typography>
          <Typography fontWeight="bold">{formatPrice(price)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
