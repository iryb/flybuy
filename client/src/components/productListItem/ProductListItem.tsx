import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Product } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { formatPrice, getProductImage } from "@/helpers/helpers";
import { Quantity } from "@components/general/quantity/Quantity";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "@/store/cart/slice";
import { ApiPath, ROOT } from "@enums/apiPath";
import { useFetch } from "@/hooks/hooks";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { Loader } from "@components/general/loader/Loader";

import styles from "./styles.module.scss";

interface ProductListItemProps {
  product: Product;
  smallImage?: boolean;
}

export const ProductListItem = ({
  product,
  smallImage,
}: ProductListItemProps): React.ReactElement => {
  const { id, count, size, sku } = product;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const url = `${ROOT}${ApiPath.ITEMSAPI}&filters[sku][$eq]=${sku}`;

  const { data, loading, error } = useFetch(url);

  if (loading) return <Loader />;

  if (error) return <p>Error</p>;

  return (
    <>
      {data && data.length > 0 && (
        <Box
          className={clsx(
            styles.product,
            smallImage ? styles.smallImage : null,
          )}
        >
          <Box className={styles.leftCol}>
            <img
              src={getProductImage(data[0].attributes.image)}
              alt={data[0].attributes.name}
              className={styles.productImage}
            />
          </Box>
          <Box className={styles.rightCol}>
            <Box className={styles.productTop}>
              <Typography fontWeight="bold">
                {formatPrice(data[0].attributes.price)}
              </Typography>
              <IconButton
                onClick={() => dispatch(removeFromCart({ id, size }))}
              >
                <HighlightOffIcon />
              </IconButton>
            </Box>
            <Typography>{data[0].attributes.name}</Typography>
            {size && (
              <Typography>
                {t("size")}: {size}
              </Typography>
            )}
            <Quantity
              callbackDecrease={() => dispatch(decreaseCount({ id, size }))}
              callbackIncrease={() => dispatch(increaseCount({ id, size }))}
              quantity={count}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
