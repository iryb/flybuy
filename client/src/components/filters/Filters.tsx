import React, { useState, useEffect } from "react";
import {
  Typography,
  ButtonGroup,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchSubcategories } from "@/store/categories/slice";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useScrollBlock, useUrlParams } from "@/hooks/hooks";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles.module.scss";

export const Filters = (): React.ReactElement => {
  const { t } = useTranslation();
  const sizes = ["xs", "sm", "md", "lg"];
  const priceRange = ["10", "20", "30", "40", "50", "100"];
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<number>();
  const [subcategoryFilter, setSubcategoryFilter] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { querySizes, queryMaxPrice, querySubcategories } =
    useUrlParams(searchParams);
  const [isMobileFiltersOpened, setMobileFiltersOpened] = useState(false);
  const { blockScroll, allowScroll } = useScrollBlock();

  const dispatch = useAppDispatch();
  const { slug } = useParams() as { slug: string };

  const subcategories = useAppSelector(
    (state) => state.categories.subcategories,
  );
  const subcategoriesList = subcategories.filter((i) => i.title === t(slug));

  const handleSizeFilter = (size: string): void => {
    if (sizeFilter?.includes(size)) {
      const newSizes = sizeFilter.filter((s) => s !== size);
      setSizeFilter(newSizes);
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
  };

  const handlePriceFilter = (price: string): void => {
    const priceNumber = parseInt(price);
    if (priceFilter === priceNumber) {
      setPriceFilter(undefined);
    } else {
      setPriceFilter(priceNumber);
    }
  };

  const handleSubcategoryFilter = (subcategory: string): void => {
    const subcatTitle = subcategory.toLowerCase();
    if (subcategoryFilter?.includes(subcatTitle)) {
      const newSubcategories = subcategoryFilter.filter(
        (i) => i !== subcatTitle,
      );
      setSubcategoryFilter(newSubcategories);
    } else {
      setSubcategoryFilter([...subcategoryFilter, subcatTitle]);
    }
  };

  const handleApplyFilters = (): void => {
    const params: {
      size?: string[];
      maxPrice?: string;
      subcat?: string[];
    } = {};
    if (sizeFilter) {
      params.size = sizeFilter;
    }

    if (priceFilter) {
      params.maxPrice = priceFilter.toString();
    }

    if (subcategoryFilter) {
      params.subcat = subcategoryFilter;
    }

    setSearchParams(params);
  };

  const handleMobileFiltersClick = (): void => {
    setMobileFiltersOpened(!isMobileFiltersOpened);
    if (isMobileFiltersOpened) {
      allowScroll();
    } else {
      blockScroll();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchSubcategories());
  }, []);

  useEffect(() => {
    if (querySizes) setSizeFilter(querySizes);
    if (queryMaxPrice) setPriceFilter(parseInt(queryMaxPrice));
    if (querySubcategories) setSubcategoryFilter(querySubcategories);
  }, [searchParams]);

  return (
    <>
      <Box className={styles.filtersIconContainerMobile}>
        <IconButton
          className={styles.filtersIconMobile}
          onClick={handleMobileFiltersClick}
        >
          <Typography>{t("filters")}</Typography>
          <FilterListIcon />
        </IconButton>
      </Box>
      <Box
        className={clsx(
          styles.filters,
          isMobileFiltersOpened ? styles.active : "",
        )}
      >
        <Typography variant="h5" className={styles.filtersTitle}>
          {t("filters")}:
        </Typography>
        <IconButton
          className={styles.filtersCloseBtn}
          onClick={handleMobileFiltersClick}
        >
          <CloseIcon />
        </IconButton>
        {sizes && (
          <Box className={styles.container}>
            <Typography className={styles.filterTitle}>{t("size")}</Typography>
            <ButtonGroup
              className={clsx(styles.filtersGroup, styles.sizesContainer)}
            >
              {sizes.map((s: string) => (
                <Button
                  key={uuidv4()}
                  onClick={() => handleSizeFilter(s)}
                  className={clsx(
                    styles.filter,
                    sizeFilter?.includes(s) ? styles.active : "",
                  )}
                  sx={{
                    borderRightColor: "rgba(29, 29, 29, 0.5)!important",
                  }}
                >
                  {s}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
        {priceRange && (
          <Box className={styles.container}>
            <Typography className={styles.filterTitle}>{t("price")}</Typography>
            <ButtonGroup
              className={clsx(styles.filtersGroup, styles.priceContainer)}
            >
              {priceRange.map((price: string) => (
                <Button
                  key={uuidv4()}
                  onClick={() => handlePriceFilter(price)}
                  className={clsx(
                    styles.filter,
                    priceFilter === parseInt(price) ? styles.active : "",
                  )}
                  sx={{
                    borderRightColor: "rgba(29, 29, 29, 0.5)!important",
                  }}
                >
                  {t("upTo")} ${price}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
        {subcategoriesList && (
          <Box className={styles.container}>
            <Typography className={styles.filterTitle}>
              {t("category")}
            </Typography>
            <ButtonGroup
              className={clsx(styles.filtersGroup, styles.subcategories)}
            >
              {subcategoriesList[0]?.items.map((item: any) => (
                <Button
                  key={uuidv4()}
                  onClick={() => handleSubcategoryFilter(item)}
                  className={clsx(
                    styles.filter,
                    subcategoryFilter?.includes(item.toLowerCase())
                      ? styles.active
                      : "",
                  )}
                  sx={{
                    borderRightColor: "rgba(29, 29, 29, 0.5)!important",
                  }}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
        <Button onClick={() => handleApplyFilters()}>
          {t("applyFiltersBtn")}
        </Button>
      </Box>
    </>
  );
};
