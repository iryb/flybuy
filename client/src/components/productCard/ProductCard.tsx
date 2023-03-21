import React, { useState } from "react";
import { addToCart } from "@store/cart/slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { CartItem } from "@/common/types/types";
import { Box, Button, Typography } from "@mui/material";
import { formatPrice } from "@helpers/helpers";
import { Quantity } from "@components/general/quantity/Quantity";

import styles from "./styles.module.scss";

interface ProductCardProps {
  item: CartItem;
  width?: string;
}

export const ProductCard = ({
  item,
  width,
}: ProductCardProps): React.ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = item;
  const { price, name, image, category } = item.attributes;

  const url = image.data?.attributes.formats.medium.url as string | null;

  const imagePlaceholder = url
    ? `http://localhost:1337${url}`
    : "http://images.unsplash.com/photo-1678972726040-2f2cefc3cefa?ixlib=rb-4.0.3";

  return (
    <Box width={width}>
      <Box className={styles.card} onClick={() => navigate(`/item-${id}`)}>
        <Box>
          <Box className={styles.cardHeader}>
            <img
              src={imagePlaceholder}
              alt={name}
              width="300"
              height="400"
              className={styles.cardImage}
            />
            <Box className={styles.cardButtonWrapper}>
              <Button
                onClick={() => dispatch(addToCart({ ...item, count: 1 }))}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
          <Typography className={styles.category}>
            {category
              ?.replace(/([A-Z])/g, " $1")
              .replace(/^./g, (word) => word.toUpperCase())}
          </Typography>
          <Typography variant="h5" className={styles.title}>
            {name}
          </Typography>
          <Typography fontWeight="bold">{formatPrice(price)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
