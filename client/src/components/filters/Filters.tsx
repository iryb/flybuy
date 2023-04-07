import React, { useState } from "react";
import { Typography, ButtonGroup, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { getUniqueSizes } from "@helpers/helpers";
import { CartItem } from "@/common/types/types";
import clsx from "clsx";

import styles from "./styles.module.scss";

export const Filters = ({
  items,
}: {
  items: CartItem[];
}): React.ReactElement => {
  const sizes = getUniqueSizes(items);
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);

  const handleSizeFilter = (size: string): void => {
    if (sizeFilter?.includes(size)) {
      const newSizes = sizeFilter.filter((s) => s !== size);
      setSizeFilter(newSizes);
    } else {
      setSizeFilter([...sizeFilter, size]);
    }
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
      <Typography className={styles.filterTitle}>Price</Typography>
    </Box>
  );
};
