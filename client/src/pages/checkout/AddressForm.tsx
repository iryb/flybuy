import { CheckoutSchemaValues } from "@/common/types/types";
import React from "react";
import { FormikProps } from "formik";
import { Box, TextField } from "@mui/material";

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
  const formattedName = (field: string): string => `${type}.${field}`;

  return (
    <Box className={styles.form}>
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}
        error={
          touched.billingAddress?.firstName &&
          Boolean(errors.billingAddress?.firstName)
        }
        helperText={
          touched.billingAddress?.firstName && errors.billingAddress?.firstName
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName("lastName")}
        error={
          touched.billingAddress?.lastName &&
          Boolean(errors.billingAddress?.lastName)
        }
        helperText={
          touched.billingAddress?.lastName && errors.billingAddress?.lastName
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={
          touched.billingAddress?.country &&
          Boolean(errors.billingAddress?.country)
        }
        helperText={
          touched.billingAddress?.country && errors.billingAddress?.country
        }
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")}
        error={
          touched.billingAddress?.street1 &&
          Boolean(errors.billingAddress?.street1)
        }
        helperText={
          touched.billingAddress?.street1 && errors.billingAddress?.street1
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (Optional)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")}
        error={
          touched.billingAddress?.street2 &&
          Boolean(errors.billingAddress?.street2)
        }
        helperText={
          touched.billingAddress?.street2 && errors.billingAddress?.street2
        }
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")}
        error={
          touched.billingAddress?.city && Boolean(errors.billingAddress?.city)
        }
        helperText={touched.billingAddress?.city && errors.billingAddress?.city}
        sx={{ gridColumn: "span 2" }}
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")}
        error={
          touched.billingAddress?.state && Boolean(errors.billingAddress?.state)
        }
        helperText={
          touched.billingAddress?.state && errors.billingAddress?.state
        }
        sx={{ gridColumn: "1fr" }}
      />
      <TextField
        fullWidth
        type="text"
        label="ZIP"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={
          touched.billingAddress?.zipCode &&
          Boolean(errors.billingAddress?.zipCode)
        }
        helperText={
          touched.billingAddress?.zipCode && errors.billingAddress?.zipCode
        }
        sx={{ gridColumn: "1fr" }}
      />
    </Box>
  );
};
