import { CheckoutSchemaValues } from "@/common/types/types";
import React from "react";
import { FormikProps } from "formik";

interface AddressFormProps {
  type: "billingAddress" | "shippingAddress";
  value: {
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
  value,
  errors,
  touched,
  handleBlur,
  handleChange,
}: AddressFormProps &
  FormikProps<CheckoutSchemaValues>): React.ReactElement => {
  return <div>AddressForm</div>;
};
