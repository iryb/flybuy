import { CheckoutSchemaValues } from "@/common/types/types";
import React from "react";
import { FormikProps } from "formik";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

interface AddressFormProps {
  type: "billingAddress" | "shippingAddress";
  values: {
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2?: string | undefined;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const AddressForm = ({
  type,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}: AddressFormProps &
  FormikProps<CheckoutSchemaValues>): React.ReactElement => {
  const { t } = useTranslation();
  const formattedName = (field: string): string => `${type}.${field}`;

  return (
    <Box className={styles.form}>
      <TextField
        fullWidth
        type="text"
        label={t("firstName")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}
        error={
          touched.billingAddress?.firstName &&
          Boolean(errors.billingAddress?.firstName)
        }
        helperText={
          touched.billingAddress?.firstName &&
          errors.billingAddress?.firstName &&
          t(errors.billingAddress.firstName)
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("lastName")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName("lastName")}
        error={
          touched.billingAddress?.lastName &&
          Boolean(errors.billingAddress?.lastName)
        }
        helperText={
          touched.billingAddress?.lastName &&
          errors.billingAddress?.lastName &&
          t(errors.billingAddress.lastName)
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("country")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={
          touched.billingAddress?.country &&
          Boolean(errors.billingAddress?.country)
        }
        helperText={
          touched.billingAddress?.country &&
          errors.billingAddress?.country &&
          t(errors.billingAddress.country)
        }
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("streetAddress")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")}
        error={
          touched.billingAddress?.street1 &&
          Boolean(errors.billingAddress?.street1)
        }
        helperText={
          touched.billingAddress?.street1 &&
          errors.billingAddress?.street1 &&
          t(errors.billingAddress.street1)
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("streetAddress2")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")}
        error={
          touched.billingAddress?.street2 &&
          Boolean(errors.billingAddress?.street2)
        }
        helperText={
          touched.billingAddress?.street2 &&
          errors.billingAddress?.street2 &&
          t(errors.billingAddress.street2)
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("city")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")}
        error={
          touched.billingAddress?.city && Boolean(errors.billingAddress?.city)
        }
        helperText={
          touched.billingAddress?.city &&
          errors.billingAddress?.city &&
          t(errors.billingAddress.city)
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("state")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")}
        error={
          touched.billingAddress?.state && Boolean(errors.billingAddress?.state)
        }
        helperText={
          touched.billingAddress?.state &&
          errors.billingAddress?.state &&
          t(errors.billingAddress.state)
        }
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label={t("zip")}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={
          touched.billingAddress?.zipCode &&
          Boolean(errors.billingAddress?.zipCode)
        }
        helperText={
          touched.billingAddress?.zipCode &&
          errors.billingAddress?.zipCode &&
          t(errors.billingAddress.zipCode)
        }
        sx={{ gridColumn: "1fr" }}
      />
    </Box>
  );
};
