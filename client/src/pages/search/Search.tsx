import { Box, Container, Typography, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import { ApiPath } from "@enums/apiPath";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setItems } from "@store/cart/slice";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";

export const Search = (): React.ReactElement => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearch = searchParams.get("s") as string;

  const queryParams = new URL(
    `${ApiPath.ROOT}/api/items?filters[name][$contains]=${querySearch}&populate=image`,
  );

  async function getItems(): Promise<void> {
    const filteredItems = await fetch(queryParams, {
      method: "GET",
    });
    const filteredItemsData = await filteredItems.json();
    dispatch(setItems(filteredItemsData.data));
    return filteredItemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, [searchParams]);

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h2" className={styles.pageTitle}>
              Search results: {querySearch}
            </Typography>
            <Grid container spacing={2} mt={2}>
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
