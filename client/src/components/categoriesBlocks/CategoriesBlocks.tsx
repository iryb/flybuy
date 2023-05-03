import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Grid, Typography } from "@mui/material";
import { ApiPath } from "@enums/apiPath";
import { setCategories } from "@store/categories/slice";
import { v4 as uuidv4 } from "uuid";
import { getCategoryImage } from "@helpers/helpers";

import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export const CategoriesBlocks = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  async function getItems(): Promise<void> {
    const items = await fetch(ApiPath.CATEGORIESAPI, {
      method: "GET",
    });
    const itemsData = await items.json();
    dispatch(setCategories(itemsData.data));
    return itemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, []);

  return (
    <>
      {categories && (
        <Box className={styles.section}>
          <Grid container>
            {categories.map((category) => (
              <Grid item sm={4} key={uuidv4()} className={styles.category}>
                <Link
                  to={`category${category.attributes.link}`}
                  className={styles.link}
                ></Link>
                <Box className={styles.imageContainer}>
                  <img
                    src={getCategoryImage(category.attributes.image)}
                    alt={category.attributes.title}
                  />
                </Box>
                <Typography variant="h3" className={styles.categoryTitle}>
                  {category.attributes.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};
