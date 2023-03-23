import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@store/hooks";
import { ApiPath } from "@enums/apiPath";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CartItem } from "@/common/types/types";
import { formatStringCapitalize, formatPrice } from "@helpers/helpers";
import { Quantity } from "@/components/general/quantity/Quantity";

import styles from "./styles.module.scss";
import { addToCart } from "@/store/cart/slice";

export const Product = (): React.ReactElement => {
  const { itemId } = useParams() as { itemId: string };
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<CartItem>();
  const [count, setCount] = useState(1);

  const descreaseCount = (): void => {
    setCount(Math.max(count - 1, 1));
  };

  const increaseCount = (): void => {
    setCount(count + 1);
  };

  async function getItem(): Promise<void> {
    const item = await fetch(
      `${ApiPath.ROOT}/api/items/${itemId}?populate=image`,
      {
        method: "GET",
      },
    );

    const itemData = await item.json();
    setItem(itemData.data);
  }

  useEffect(() => {
    getItem().catch((err) => console.log(err));
  }, [itemId]);

  return (
    <>
      {item && (
        <Box className={styles.section}>
          <Container>
            <Grid container spacing={8}>
              <Grid item sm={5} xs={12}>
                <img
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  src={`${ApiPath.ROOT}${item?.attributes.image.data?.attributes.formats.medium.url}`}
                  alt={item?.attributes.name}
                  className={styles.mainImage}
                />
              </Grid>
              <Grid item sm={7} xs={12}>
                <Typography variant="h2" className={styles.productTitle}>
                  {item.attributes.name}
                </Typography>
                {item.attributes.category && (
                  <Typography className={styles.category}>
                    {formatStringCapitalize(item.attributes.category)}
                  </Typography>
                )}
                <Typography fontWeight="bold">
                  {formatPrice(item.attributes.price)}
                </Typography>

                <Quantity
                  callbackDecrease={descreaseCount}
                  callbackIncrease={increaseCount}
                  quantity={count}
                />

                <Button onClick={() => dispatch(addToCart({ ...item, count }))}>
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};
