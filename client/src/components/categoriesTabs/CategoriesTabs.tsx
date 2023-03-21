import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setItems } from "@store/cart/slice";
import { ProductCard } from "../productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";
import { Container } from "@mui/system";

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
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
          <Tab label="New Arrivals" value="newArrivals" />
          <Tab label="Best Sellers" value="bestSellers" />
          <Tab label="Top Rated" value="topRated" />
        </Tabs>
        <Box className={styles.productsGrid}>
          {value === "all" &&
            items.map((item) => <ProductCard key={uuidv4()} item={item} />)}
          {value === "newArrivals" &&
            newArrivals.map((item) => (
              <ProductCard key={uuidv4()} item={item} />
            ))}
          {value === "bestSellers" &&
            bestSellers.map((item) => (
              <ProductCard key={uuidv4()} item={item} />
            ))}
          {value === "topRated" &&
            topRated.map((item) => <ProductCard key={uuidv4()} item={item} />)}
        </Box>
      </Container>
    </Box>
  );
};
