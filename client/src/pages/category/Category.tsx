import {
  Box,
  Container,
  Typography,
  Grid,
  Chip,
  Pagination,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ApiPath, ROOT } from "@enums/apiPath";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { Filters } from "@/components/filters/Filters";
import { useFetch, useUrlParams } from "@/hooks/hooks";
import { useTranslation } from "react-i18next";
import { Loader } from "@components/general/loader/Loader";
import { CartItem } from "@/common/types/types";

import styles from "./styles.module.scss";

export const Category = (): React.ReactElement => {
  const { t } = useTranslation();
  const { slug } = useParams() as { slug: string };
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { querySizes, queryMaxPrice, querySubcategories } =
    useUrlParams(searchParams);

  const queryParams = new URL(
    `${ROOT}${ApiPath.ITEMSAPI}&filters[personCategory][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=9`,
  );

  querySizes?.forEach((s) => {
    queryParams.searchParams.append("filters[size][$containsi]", s);
  });

  if (queryMaxPrice) {
    queryParams.searchParams.append("filters[price][$lte]", queryMaxPrice);
  }

  querySubcategories?.forEach((s) => {
    queryParams.searchParams.append(
      "filters[$and][0][subcategory][title][$eq]",
      s.charAt(0).toUpperCase() + s.slice(1),
    );
  });

  const { data, meta, loading, error } = useFetch(queryParams.toString());

  useEffect(() => {
    setPageCount(meta?.pagination?.pageCount);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  const handleRemoveSizeFilter = (s: string): void => {
    const params: {
      size?: string[];
      maxPrice?: string;
      subcat?: string[];
    } = {};
    if (querySizes) {
      params.size = querySizes.filter((p) => p !== s);
    }

    if (queryMaxPrice) {
      params.maxPrice = queryMaxPrice;
    }

    if (querySubcategories) {
      params.subcat = querySubcategories;
    }

    setSearchParams(params);
  };

  const handleRemovePriceFilter = (p: string): void => {
    const params: {
      size?: string[];
      subcat?: string[];
    } = {};
    if (querySizes) {
      params.size = querySizes;
    }

    if (querySubcategories) {
      params.subcat = querySubcategories;
    }

    setSearchParams(params);
  };

  const handleRemoveSubcategoryFilter = (s: string): void => {
    const params: {
      size?: string[];
      maxPrice?: string;
      subcat?: string[];
    } = {};
    if (querySizes) {
      params.size = querySizes;
    }

    if (queryMaxPrice) {
      params.maxPrice = queryMaxPrice;
    }

    if (querySubcategories) {
      params.subcat = querySubcategories.filter((p) => p !== s);
    }

    setSearchParams(params);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  if (loading) return <Loader />;

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12}>
            <Filters />
          </Grid>
          <Grid item md={9} sm={12}>
            <Typography variant="h2" className={styles.pageTitle}>
              {t(slug)}
            </Typography>
            <Box className={styles.filterPillsContainer}>
              {querySizes?.map((s) => (
                <Chip
                  key={uuidv4()}
                  label={s}
                  onDelete={() => handleRemoveSizeFilter(s)}
                />
              ))}
              {queryMaxPrice && (
                <Chip
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  label={`${t("upTo")} $${queryMaxPrice}`}
                  onDelete={() => handleRemovePriceFilter(queryMaxPrice)}
                />
              )}
              {querySubcategories?.map((s) => (
                <Chip
                  key={uuidv4()}
                  label={s}
                  onDelete={() => handleRemoveSubcategoryFilter(s)}
                />
              ))}
            </Box>

            <Grid container spacing={2} mt={2}>
              {!!data &&
                data.map((item: CartItem) => (
                  <Grid item sm={4} xs={12} key={item.id}>
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
