import React, { useState } from "react";
import { ButtonGroup, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { Size } from "@/common/types/types";

import styles from "./styles.module.scss";

interface SizesProps {
  items: Size[];
  callback: (s: string) => void;
  className?: string;
}

export const Sizes = ({
  items,
  callback,
  className,
}: SizesProps): React.ReactElement => {
  const [activeSize, setActiveSize] = useState("");

  const handleSizeClick = (size: string): void => {
    callback(size);
    setActiveSize(size);
  };

  return (
    <ButtonGroup className={styles.filtersGroup}>
      {items.map((s: Size) => (
        <Button
          key={uuidv4()}
          className={clsx(
            styles.filter,
            className,
            activeSize === s.size ? styles.active : "",
          )}
          onClick={() => handleSizeClick(s.size)}
          sx={{
            borderRightColor: "rgba(29, 29, 29, 0.5)!important",
          }}
        >
          {s.size}
        </Button>
      ))}
    </ButtonGroup>
  );
};
