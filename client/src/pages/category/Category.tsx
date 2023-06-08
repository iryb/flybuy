import { Box, Container, Typography, Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { ApiPath } from "@enums/apiPath";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setItems, setSizes, setPriceRange } from "@store/cart/slice";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { Filters } from "@/components/filters/Filters";
import { getUniqueSizes, getPriceRange } from "@helpers/helpers";

import styles from "./styles.module.scss";

const useQuery = (): URLSearchParams => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const Category = (): React.ReactElement => {
  const { slug } = useParams() as { slug: string };
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const query = useQuery();

  const querySizes = query.getAll("size");
  const maxPrice = query.get("maxPrice");
  const querySubcategories = query.getAll("subcat");

  const queryParams = new URL(
    `${ApiPath.ROOT}/api/items?filters[personCategory][$eq]=${slug}&populate=image`,
  );

  querySizes?.forEach((s) => {
    queryParams.searchParams.append("filters[size][$contains]", s);
  });

  if (maxPrice) {
    queryParams.searchParams.append("filters[price][$lte]", maxPrice);
  }

  querySubcategories?.forEach((s) => {
    queryParams.searchParams.append(
      "filters[$and][0][subcategory][title][$eq]",
      s.charAt(0).toUpperCase() + s.slice(1),
    );
  });

  async function getItems(): Promise<void> {
    const filteredItems = await fetch(queryParams, {
      method: "GET",
    });
    const filteredItemsData = await filteredItems.json();
    dispatch(setItems(filteredItemsData.data));

    const items = await fetch(
      `${ApiPath.ROOT}/api/items?filters[personCategory][$eq]=${slug}&populate=image`,
      {
        method: "GET",
      },
    );
    const itemsData = await items.json();
    const sizes = getUniqueSizes(itemsData.data);
    dispatch(setSizes(sizes));
    const priceRange = getPriceRange(itemsData.data);
    dispatch(setPriceRange(priceRange));
    return itemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, [slug, query]);

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12}>
            <Filters />
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
