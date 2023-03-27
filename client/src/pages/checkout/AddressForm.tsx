import { CheckoutSchemaValues } from "@/common/types/types";
import React from "react";
import { FormikProps, getIn } from "formik";
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
  const formattedError = (field: string): boolean =>
    Boolean(
      getIn(
        touched,
        formattedName(field) && getIn(errors, formattedName(field)),
      ),
    );
  // const formattedHelper = (field: string): string =>
  //   getIn(touched, formattedName(field) && getIn(errors, formattedName(field)));

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
        error={formattedError("firstName")}
        // helperText={formattedHelper("firstName")}
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
        error={formattedError("lastName")}
        // helperText={formattedHelper("lastName")}
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
        error={formattedError("country")}
        // helperText={formattedHelper("country")}
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
        error={formattedError("street1")}
        // helperText={formattedHelper("street1")}
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
        error={formattedError("street2")}
        // helperText={formattedHelper("street2")}
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
        error={formattedError("city")}
        // helperText={formattedHelper("city")}
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
        error={formattedError("state")}
        // helperText={formattedHelper("state")}
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
        error={formattedError("zipCode")}
        // helperText={formattedHelper("zipCode")}
        sx={{ gridColumn: "1fr" }}
      />
    </Box>
  );
};
