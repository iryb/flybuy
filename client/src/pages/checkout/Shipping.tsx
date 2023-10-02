// @ts-nocheck
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { CheckoutSchemaValues } from "@/common/types/types";
import { FormikProps } from "formik";
import { AddressForm } from "./AddressForm";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}: FormikProps<CheckoutSchemaValues>): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography className={styles.formTitle}>
        {t("billingFormTitle")}
      </Typography>
      <Box sx={{ marginBottom: "15px" }}>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          label={t("sameForShippingLabel")}
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress,
                )
              }
            />
          }
        />
      </Box>

      {!values.shippingAddress.isSameAddress && (
        <Box sx={{ marginBottom: "15px" }}>
          <Typography className={styles.formTitle}>
            {t("shippingFormTitle")}
          </Typography>
          <Box>
            <AddressForm
              type="shippingAddress"
              values={values.shippingAddress}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
