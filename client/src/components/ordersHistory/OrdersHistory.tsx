import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";
import { OrderItem } from "@components/orderItem/OrderItem";
import { v4 as uuidv4 } from "uuid";

import styles from "./styles.module.scss";

export const OrdersHistory = (): React.ReactElement => {
  const orders = useAppSelector((state) => state.order.data);
  return (
    <Box className={styles.pageContent}>
      <Typography variant="h3" className={styles.ordersTitle}>
        Orders History
      </Typography>
      {orders
        ?.slice()
        .sort((a, b) => {
          return (
            new Date(b.attributes.createdAt).getTime() -
            new Date(a.attributes.createdAt).getTime()
          );
        })
        .map((order) => (
          <OrderItem key={uuidv4()} item={order} />
        ))}
    </Box>
  );
};
