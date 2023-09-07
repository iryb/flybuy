import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CheckoutSchemaValues } from "@/common/types/types";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Payment = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}: FormikProps<CheckoutSchemaValues>): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Box sx={{ marginBottom: "15px" }}>
      <Typography className={styles.formTitle}>
        {t("paymentFormTitle")}
      </Typography>
      <TextField
        fullWidth
        type="text"
        label={t("email")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
        sx={{ gridColumn: "span 4", marginBottom: "15px" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("phoneNumber")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name="phoneNumber"
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
        helperText={touched.phoneNumber && errors.phoneNumber}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};
