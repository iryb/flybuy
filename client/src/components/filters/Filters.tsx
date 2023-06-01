import React, { useState, useEffect } from "react";
import {
  Typography,
  ButtonGroup,
  Button,
  Box,
  Slider,
  Input,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchSubcategories } from "@/store/categories/slice";

import styles from "./styles.module.scss";

const useQuery = (): URLSearchParams => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const Filters = (): React.ReactElement => {
  const sizes = ["xs", "sm", "md", "lg"];
  const priceRange = ["10", "20", "30", "40", "50", "100"];
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [subcategoryFilter, setSubcategoryFilter] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>();

  const query = useQuery();
  const maxPrice = query.get("maxPrice") as string;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subcategories = useAppSelector(
    (state) => state.categories.subcategories,
  );
  const subcategoriesFilter = subcategories.find(
    (item) => item.title === "Women",
  );

  const handleSizeFilter = (size: string): void => {
    if (sizeFilter?.includes(size)) {
      const newSizes = sizeFilter.filter((s) => s !== size);
      setSizeFilter(newSizes);
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
  };

  const handleSubcategoryFilter = (item: string): void => {
    if (subcategoryFilter?.includes(item)) {
      const newSubcategories = subcategoryFilter.filter((i) => i !== item);
      setSubcategoryFilter(newSubcategories);
    } else {
      setSubcategoryFilter([...subcategoryFilter, item]);
    }
  };

  // const handlePriceChange = (
  //   event: Event,
  //   newValue: number | number[],
  // ): void => {
  //   // @ts-expect-error
  //   setPrice(newValue);
  // };

  // const handleMaxPriceChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ): void => {
  //   const newValue = Number(event.target.value);
  //   setPrice([price[0], newValue]);
  // };

  const handleApplyFilters = (): void => {
    let queryParams = `?`;
    if (price) {
      queryParams += `minPrice=${price[0]}&maxPrice=${price[1]}`;
    }
    navigate({
      pathname: "",
      search: queryParams,
    });
  };

  // useEffect(() => {
  //   if (minPrice && maxPrice) {
  //     setPrice([parseInt(minPrice), parseInt(maxPrice)]);
  //   }
  // }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchSubcategories());
  }, []);

  return (
    <Box className={styles.filters}>
      <Typography variant="h5" className={styles.filtersTitle}>
        Filters:
      </Typography>
      {sizes && (
        <Box className={styles.container}>
          <Typography className={styles.filterTitle}>Size</Typography>
          <ButtonGroup className={styles.filtersGroup}>
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
          <Typography className={styles.filterTitle}>Price</Typography>
          <ButtonGroup
            className={clsx(styles.filtersGroup, styles.priceContainer)}
          >
            {priceRange.map((s: string) => (
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
                Up to ${s}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      )}
      {subcategories && (
        <Box className={styles.container}>
          <Typography className={styles.filterTitle}>Subcategories</Typography>
          <ButtonGroup
            className={clsx(styles.filtersGroup, styles.subcategories)}
          >
            {subcategoriesFilter?.items.map((item: any) => (
              <Button
                key={uuidv4()}
                onClick={() => handleSubcategoryFilter(item)}
                className={clsx(
                  styles.filter,
                  subcategoryFilter?.includes(item) ? styles.active : "",
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
      <Button onClick={() => handleApplyFilters()}>Apply filters</Button>
    </Box>
  );
};
