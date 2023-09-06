import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import clsx from "clsx";
// import { Navigate } from "react-router-dom";
import { fetchOrders } from "@/store/order/slice";
import { OrdersHistory } from "@/components/ordersHistory/OrdersHistory";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Profile = (): React.ReactElement => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchOrders(user.id));
  }, [user.id]);

  // if (!user.name) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Box className={clsx("section", styles.pageContent)}>
      <Container>
        <Typography
          variant="h1"
          className={clsx("pageTitle", styles.pageTitle)}
        >
          {t("profileGreeting")}, {user.name}!
        </Typography>
        <OrdersHistory />
      </Container>
    </Box>
  );
};
