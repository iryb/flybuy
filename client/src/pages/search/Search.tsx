import { Box, Container, Typography, Grid, Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ApiPath, ROOT } from "@enums/apiPath";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { useFetch } from "@/hooks/hooks";
import { CartItem } from "@/common/types/types";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Search = (): React.ReactElement => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const querySearch = searchParams.get("s") as string;

  const queryParams = new URL(
    `${ROOT}${ApiPath.ITEMSAPI}&filters[name][$containsi]=${querySearch}&pagination[page]=${page}&pagination[pageSize]=9`,
  );

  const {
    data: items,
    meta,
    loading,
    error,
  } = useFetch(queryParams.toString());

  useEffect(() => {
    setPageCount(meta?.pagination?.pageCount);
  }, [items]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <Typography variant="h2" className={styles.pageTitle}>
              {t("searchResultsTitle")}: {querySearch}
            </Typography>
            <Grid container spacing={2} mt={2}>
              {items?.map((item: CartItem) => (
                <Grid item sm={4} xs={12} key={uuidv4()}>
                  <ProductCard item={item} />
                </Grid>
              ))}
            </Grid>
            {pageCount > 1 && (
              <Grid container mt={4} className={styles.paginationContainer}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
