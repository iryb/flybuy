import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItems } from "@store/cart/slice";
import { ProductCard } from "../productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { ApiPath } from "@enums/apiPath";
import { ItemsCategories } from "@enums/itemsCategories";

import styles from "./styles.module.scss";
import { Container } from "@mui/system";
import { formatStringCapitalize } from "@/helpers/helpers";

export const CategoriesTabs = (): React.ReactElement => {
  const [value, setValue] = useState("all");
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const handleTabChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ): void => {
    setValue(newValue);
  };

  async function getItems(): Promise<void> {
    const items = await fetch(ApiPath.ITEMSAPI, {
      method: "GET",
    });
    const itemsData = await items.json();
    dispatch(setItems(itemsData.data));
    return itemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, []);

  const topRated = items.filter(
    (item) => item.attributes.category === "topRated",
  );

  const newArrivals = items.filter(
    (item) => item.attributes.category === "newArrivals",
  );

  const bestSellers = items.filter(
    (item) => item.attributes.category === "bestSellers",
  );

  return (
    <Box className={styles.section}>
      <Container>
        <Typography variant="h3" className={styles.sectionTitle}>
          Featured Products
        </Typography>
        <Tabs
          value={value}
          onChange={handleTabChange}
          centered
          className={styles.categories}
        >
          <Tab label="All" value="all" />
          <Tab
            label={formatStringCapitalize(ItemsCategories.NEWARRIVALS)}
            value={ItemsCategories.NEWARRIVALS}
          />
          <Tab
            label={formatStringCapitalize(ItemsCategories.BESTSELLERS)}
            value={ItemsCategories.BESTSELLERS}
          />
          <Tab
            label={formatStringCapitalize(ItemsCategories.TOPRATED)}
            value={ItemsCategories.TOPRATED}
          />
        </Tabs>
        <Box className={styles.productsGrid}>
          {value === "all" &&
            items.map((item) => <ProductCard key={uuidv4()} item={item} />)}
          {value === ItemsCategories.NEWARRIVALS &&
            newArrivals.map((item) => (
              <ProductCard key={uuidv4()} item={item} />
            ))}
          {value === ItemsCategories.BESTSELLERS &&
            bestSellers.map((item) => (
              <ProductCard key={uuidv4()} item={item} />
            ))}
          {value === ItemsCategories.TOPRATED &&
            topRated.map((item) => <ProductCard key={uuidv4()} item={item} />)}
        </Box>
      </Container>
    </Box>
  );
};
