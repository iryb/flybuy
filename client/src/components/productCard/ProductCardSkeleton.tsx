import { Box, Skeleton, Typography } from "@mui/material";

import styles from "./styles.module.scss";

export const ProductCardSkeleton = (): React.ReactElement => (
  <Box>
    <Skeleton variant="rectangular" width={275} height={350} />
    <Skeleton variant="text">
      <Typography className={styles.category}>Category</Typography>
    </Skeleton>
    <Skeleton variant="text">
      <Typography variant="h5" className={styles.title}>
        Jeans with mesh detail
      </Typography>
    </Skeleton>
    <Skeleton variant="text">
      <Typography fontWeight="bold">$35.00</Typography>
    </Skeleton>
  </Box>
);
