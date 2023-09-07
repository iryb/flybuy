import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Product } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { formatPrice } from "@/helpers/helpers";
import { Quantity } from "@components/general/quantity/Quantity";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
} from "@/store/cart/slice";
import { ApiPath } from "@enums/apiPath";
import { useFetch } from "@/hooks/hooks";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const ProductListItem = ({
  id,
  count,
  size,
}: Product): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const url = `${ApiPath.ITEMSAPI}&filters[id][$eq]=${id}`;

  // eslint-disable-next-line
  const { data, loading, error } = useFetch(url);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <Box>
      {data && (
        <Box className={styles.product}>
          <Box flex="1 1 40%" className={styles.leftCol}>
            <img
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              src={`${ApiPath.ROOT}${data[0].attributes.image.data?.attributes.formats.medium.url}`}
              alt={data[0].attributes.name}
              className={styles.productImage}
            />
          </Box>
          <Box flex="1 1 60%">
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
    </Box>
  );
};
