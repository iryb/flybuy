import React, { useEffect } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import clsx from "clsx";
import { fetchOrders } from "@/store/order/slice";
import { OrdersHistory } from "@/components/ordersHistory/OrdersHistory";
import { useTranslation } from "react-i18next";
import { ProfileSettings } from "@/components/profileSettings/ProfileSettings";

import styles from "./styles.module.scss";

export const Profile = (): React.ReactElement => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(fetchOrders(user.id));
  }, [user.id]);

  return (
    <Box className={clsx("page section", styles.pageContent)}>
      <Container>
        <Typography
          variant="h1"
          className={clsx("pageTitle", styles.pageTitle)}
        >
          {t("profileGreeting")}, {user.name}!
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label={t("ordersHistory")} id="tab-0" />
          <Tab label={t("profileSettings")} id="tab-1" />
        </Tabs>
        <div
          role="tabpanel"
          hidden={value !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
        >
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <OrdersHistory />
            </Box>
          )}
        </div>
        <div
          role="tabpanel"
          hidden={value !== 1}
          id="tabpanel-1"
          aria-labelledby="tab-1"
        >
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <ProfileSettings />
            </Box>
          )}
        </div>
      </Container>
    </Box>
  );
};
