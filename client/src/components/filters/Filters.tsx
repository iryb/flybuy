import React, { useState } from "react";
import {
  Typography,
  ButtonGroup,
  Button,
  Box,
  Slider,
  Input,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { getUniqueSizes, getPriceRange } from "@helpers/helpers";
import { CartItem } from "@/common/types/types";
import clsx from "clsx";

import styles from "./styles.module.scss";

export const Filters = ({
  items,
}: {
  items: CartItem[];
}): React.ReactElement => {
  const sizes = getUniqueSizes(items);
  const priceRange = getPriceRange(items);

  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [price, setPrice] = useState<number[]>(priceRange);

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
    setPrice(newValue as number[]);
  };

  const handleMinPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue =
      event.target.value === "" ? price[0] : Number(event.target.value);
    setPrice([newValue, price[1]]);
  };

  const handleMaxPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const newValue =
      event.target.value === "" ? price[1] : Number(event.target.value);
    setPrice([price[0], newValue]);
  };

  return (
    <Box className={styles.filters}>
      <Typography variant="h5" className={styles.filtersTitle}>
        Filters:
      </Typography>
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
      <Box className={styles.container}>
        <Typography className={styles.filterTitle}>Price</Typography>
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
        <Slider
          value={price}
          onChange={handlePriceChange}
          min={priceRange[0]}
          max={priceRange[1]}
          className={styles.priceSlider}
        />
      </Box>
    </Box>
  );
};
