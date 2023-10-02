import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ApiPath } from "@enums/apiPath";
import { v4 as uuidv4 } from "uuid";
import { getProductImage } from "@helpers/helpers";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/hooks";
import { Category } from "@/common/types/types";
import { Loader } from "@components/general/loader/Loader";

import styles from "./styles.module.scss";

export const CategoriesBlocks = (): React.ReactElement => {
  const { data, loading, error } = useFetch(`${ApiPath.CATEGORIESAPI}`);

  if (loading) return <Loader />;

  return (
    <>
      {data && (
        <Box className={styles.section}>
          <Grid container>
            {data.map((category: Category) => (
              <Grid item sm={4} key={uuidv4()} className={styles.category}>
                <Link
                  to={`category${category.attributes.link}`}
                  className={styles.link}
                ></Link>
                <Box className={styles.imageContainer}>
                  <img
                    src={getProductImage(category.attributes.image)}
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
