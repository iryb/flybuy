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
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { price, name, image } = item.attributes;

  const url = image.data?.attributes.formats.medium.url as string | null;

  const imagePlaceholder = url
    ? `http://localhost:1337${url}`
    : "http://images.unsplash.com/photo-1678972726040-2f2cefc3cefa?ixlib=rb-4.0.3";

  const descreaseCount = (): void => {
    setCount(Math.max(count - 1, 1));
  };

  const increaseCount = (): void => {
    setCount(count + 1);
  };

  return (
    <Box width={width}>
      <Box className={styles.card}>
        <Box>
          <img
            src={imagePlaceholder}
            alt={name}
            width="300"
            height="400"
            className={styles.cardImage}
          />
          <Typography variant="h5">{name}</Typography>
          <Typography fontWeight="bold">{formatPrice(price)}</Typography>
        </Box>
        <Box className={styles.cardFooter}>
          <Quantity
            callbackDecrease={descreaseCount}
            callbackIncrease={increaseCount}
            quantity={count}
          />
          <Button onClick={() => dispatch(addToCart({ ...item, count }))}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
