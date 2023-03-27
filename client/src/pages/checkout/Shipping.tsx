// @ts-nocheck
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { CheckoutSchemaValues } from "@/common/types/types";
import { FormikProps } from "formik";
import { AddressForm } from "./AddressForm";

import styles from "./styles.module.scss";

export const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}: FormikProps<CheckoutSchemaValues>): React.ReactElement => {
  return (
    <Box>
      <Typography className={styles.formTitle}>Billing Information</Typography>
      <Box>
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
          label="Same for Shipping Address"
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
        <>
          <Typography className={styles.formTitle}>
            Shipping Information
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
        </>
      )}
    </Box>
  );
};
