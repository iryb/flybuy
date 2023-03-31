import { Box, Container, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { ApiPath } from "@enums/apiPath";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setItems } from "@store/cart/slice";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";

export const Category = (): React.ReactElement => {
  const { slug } = useParams() as { slug: string };
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  async function getItems(): Promise<void> {
    const items = await fetch(
      `${ApiPath.ROOT}/api/items?filters[personCategory][$eq]=${slug}&populate=image`,
      {
        method: "GET",
      },
    );
    const itemsData = await items.json();
    dispatch(setItems(itemsData.data));
    return itemsData;
  }

  const sizes = items.map((item) => item.attributes.size?.data);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, []);

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12}>
            {/* TODO: Filters */}
            <Typography variant="h5" className={styles.filtersTitle}>
              Filters:
            </Typography>
            <Typography className={styles.filterTitle}>Size</Typography>
            <Typography className={styles.filterTitle}>Price</Typography>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Typography variant="h2" className={styles.pageTitle}>
              For {slug}
            </Typography>
            <Grid container spacing={2}>
              {items?.map((item) => (
                <Grid item sm={4} xs={12} key={uuidv4()}>
                  <ProductCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
