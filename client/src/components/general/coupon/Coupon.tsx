import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import clsx from "clsx";
import { useAppDispatch } from "@/store/hooks";
import { fetchCoupon } from "@/store/cart/slice";

import styles from "./styles.module.scss";

export const Coupon = ({
  className,
}: {
  className?: string;
}): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState({ text: "", status: "" });

  const formik = useFormik({
    initialValues: {
      coupon: "",
    },
    onSubmit: (values) => {
      setMessage({ text: "", status: "" });
      dispatch(fetchCoupon(values.coupon))
        .unwrap()
        .then(() => setMessage({ text: t("couponApplied"), status: "success" }))
        .catch(() => setMessage({ text: t("invalidCoupon"), status: "error" }));
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
      {message.text && (
        <Typography
          className={message.status === "error" ? "error" : "success"}
          sx={{ marginTop: "5px" }}
        >
          {message.text}
        </Typography>
      )}
    </Box>
  );
};
