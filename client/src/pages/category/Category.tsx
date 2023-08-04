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
import { ApiPath } from "@enums/apiPath";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setItems, setSizes, setPriceRange } from "@store/cart/slice";
import { ProductCard } from "@components/productCard/ProductCard";
import { v4 as uuidv4 } from "uuid";
import { Filters } from "@/components/filters/Filters";

import styles from "./styles.module.scss";

export const Category = (): React.ReactElement => {
  const { slug } = useParams() as { slug: string };
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const querySizes = searchParams.getAll("size");
  const maxPrice = searchParams.get("maxPrice");
  const querySubcategories = searchParams.getAll("subcat");

  const queryParams = new URL(
    `${ApiPath.ROOT}/api/items?filters[personCategory][$eq]=${slug}&populate=image&pagination[page]=${page}&pagination[pageSize]=9`,
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
    setPageCount(filteredItemsData.meta.pagination.pageCount);
    return filteredItemsData;
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getItems();
  }, [slug, searchParams, page]);

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

    if (maxPrice) {
      params.maxPrice = maxPrice;
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

    if (maxPrice) {
      params.maxPrice = maxPrice;
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

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Grid container spacing={4}>
          <Grid item md={3} sm={12}>
            <Filters />
          </Grid>
          <Grid item md={9} sm={12}>
            <Typography variant="h2" className={styles.pageTitle}>
              For {slug}
            </Typography>
            {querySizes?.map((s) => (
              <Chip
                key={uuidv4()}
                label={s}
                onDelete={() => handleRemoveSizeFilter(s)}
              />
            ))}
            {maxPrice && (
              <Chip
                label={`Up to $${maxPrice}`}
                onDelete={() => handleRemovePriceFilter(maxPrice)}
              />
            )}
            {querySubcategories?.map((s) => (
              <Chip
                key={uuidv4()}
                label={s}
                onDelete={() => handleRemoveSubcategoryFilter(s)}
              />
            ))}

            <Grid container spacing={2} mt={2}>
              {items?.map((item) => (
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
