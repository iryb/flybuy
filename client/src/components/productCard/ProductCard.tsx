import React from "react";
import { addToCart } from "@store/cart/slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { CartItem } from "@/common/types/types";
import { Box, Button, Typography } from "@mui/material";
import { formatPrice, formatStringCapitalize } from "@helpers/helpers";
import { ApiPath } from "@enums/apiPath";
import placeholder from "@images/productPlaceholder.jpg";

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

  const imagePlaceholder = url ? `${ApiPath.ROOT}${url}` : placeholder;

  return (
    <Box width={width}>
      <Box className={styles.card} onClick={() => navigate(`/item/${id}`)}>
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
          {category && (
            <Typography className={styles.category}>
              {formatStringCapitalize(category)}
            </Typography>
          )}
          <Typography variant="h5" className={styles.title}>
            {name}
          </Typography>
          <Typography fontWeight="bold">{formatPrice(price)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
