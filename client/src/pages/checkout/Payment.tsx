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
        {t("orderDetailsFormTitle")}
      </Typography>
      <Box className={styles.form}>
        <TextField
          fullWidth
          type="text"
          label={t("phoneNumber")}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
          helperText={
            touched.phoneNumber && errors.phoneNumber && t(errors.phoneNumber)
          }
          sx={{ gridColumn: "span 4" }}
        />
        <TextField
          fullWidth
          multiline
          type="text"
          label={t("comment")}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.comment}
          name="comment"
          error={touched.comment && Boolean(errors.comment)}
          helperText={touched.comment && errors.comment && t(errors.comment)}
          sx={{ gridColumn: "span 4" }}
        />
      </Box>
    </Box>
  );
};
