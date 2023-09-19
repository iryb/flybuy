import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import clsx from "clsx";
import { CouponSchemaValues } from "@/common/types/types";

import styles from "./styles.module.scss";

export const Coupon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const { t } = useTranslation();

  const handleAddCoupon = (values: CouponSchemaValues): void => {
    console.log(values.coupon);
  };

  const formik = useFormik({
    initialValues: {
      coupon: "",
    },
    onSubmit: (values) => {
      void handleAddCoupon(values);
    },
  });

  return (
    <Box className={clsx(styles.couponContainer, className)}>
      <form className={styles.couponForm} onSubmit={formik.handleSubmit}>
        <TextField
          label={t("couponFieldLabel")}
          className={styles.couponInput}
          fullWidth
          type="text"
          sx={{
            ".MuiInputBase-root": {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          }}
          name="coupon"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.coupon}
        />
        <Button className={styles.couponAddBtn} type="submit">
          {t("apply")}
        </Button>
      </form>
    </Box>
  );
};
