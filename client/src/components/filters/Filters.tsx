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
import { useAppSelector } from "@store/hooks";

import styles from "./styles.module.scss";

const useQuery = (): URLSearchParams => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const Filters = (): React.ReactElement => {
  const sizes = useAppSelector((state) => state.cart.sizes);
  const priceRange = useAppSelector((state) => state.cart.priceRange);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>(priceRange);

  const query = useQuery();
  const minPrice = query.get("minPrice") as string;
  const maxPrice = query.get("maxPrice") as string;

  const navigate = useNavigate();

  const handleSizeFilter = (size: string): void => {
    if (sizeFilter?.includes(size)) {
      const newSizes = sizeFilter.filter((s) => s !== size);
      setSizeFilter(newSizes);
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
  };

  const handlePriceChange = (
    event: Event,
    newValue: number | number[],
  ): void => {
    // @ts-expect-error
    setPrice(newValue);
  };

  const handleMinPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue = Number(event.target.value);
    setPrice([newValue, price[1]]);
  };

  const handleMaxPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue = Number(event.target.value);
    setPrice([price[0], newValue]);
  };

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

  useEffect(() => {
    if (minPrice && maxPrice) {
      setPrice([parseInt(minPrice), parseInt(maxPrice)]);
    }
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
          {price && (
            <Box className={styles.rangeInputs}>
              <Input
                value={price[0]}
                onChange={handleMinPriceChange}
                type="number"
              />
              <Input
                value={price[1]}
                onChange={handleMaxPriceChange}
                type="number"
              />
            </Box>
          )}
          <Slider
            value={price}
            onChange={handlePriceChange}
            min={priceRange[0]}
            max={priceRange[1]}
            className={styles.priceSlider}
          />
        </Box>
      )}
      <Button onClick={() => handleApplyFilters()}>Apply filters</Button>
    </Box>
  );
};
