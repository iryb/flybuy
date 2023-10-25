import React from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import { ApiPath, ROOT } from "@enums/apiPath";
import { getProductImage } from "@helpers/helpers";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/hooks";
import { Category } from "@/common/types/types";
import { Image } from "@components/general/image/Image";

import styles from "./styles.module.scss";

export const CategoriesBlocks = (): React.ReactElement => {
  const { data, loading, error } = useFetch(
    `${ROOT}${ApiPath.CATEGORIESAPI}?populate=image`,
  );

  return (
    <Box className={styles.section}>
      <Grid container>
        {loading ? (
          <Skeleton variant="rectangular" width={"100%"} height={600} />
        ) : (
          data.map((category: Category, index: number) => (
            <Grid item sm={4} key={index} className={styles.category}>
              <Link
                to={`category${category.attributes.link}`}
                className={styles.link}
              ></Link>
              <Box className={styles.imageContainer}>
                <Image
                  src={getProductImage(category.attributes.image)}
                  alt={category.attributes.title}
                  width="640px"
                  height="600px"
                />
              </Box>
              <Typography variant="h3" className={styles.categoryTitle}>
                {category.attributes.title}
              </Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
