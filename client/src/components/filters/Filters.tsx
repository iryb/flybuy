import React, { useState } from "react";
import { Typography, ButtonGroup, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { getUniqueSizes } from "@helpers/helpers";
import { CartItem } from "@/common/types/types";

import styles from "./styles.module.scss";

export const Filters = ({
  items,
}: {
  items: CartItem[];
}): React.ReactElement => {
  const sizes = getUniqueSizes(items);
  const [sizeFilter, setSizeFilter] = useState();

  const handleChangeSizes = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {};

  return (
    <>
      <Typography variant="h5" className={styles.filtersTitle}>
        Filters:
      </Typography>
      <Typography className={styles.filterTitle}>Size</Typography>
      <ButtonGroup>
        {sizes.map((s: string) => (
          <Button key={uuidv4()} onClick={handleChangeSizes}>
            {s}
          </Button>
        ))}
      </ButtonGroup>
      <Typography className={styles.filterTitle}>Price</Typography>
    </>
  );
};
