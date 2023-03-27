import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "@/store/hooks";
import { Box, Container } from "@mui/system";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Shipping } from "./Shipping";
import { CheckoutSchemaValues } from "@/common/types/types";

import styles from "./styles.module.scss";

const initialValues: CheckoutSchemaValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean().required("required"),
      firstName: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      lastName: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      country: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      street1: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      state: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
      zipCode: yup.string().when("isSameAddress", {
        // @ts-expect-error
        is: false,
        then: yup.string().required("required"),
        otherwise: "",
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export const Checkout = (): React.ReactElement => {
  const [activeStep, setActiveStep] = useState(0);
  // const cart = useAppSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 2;

  const handleFormSubmit = async (): Promise<void> => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Box>
      <Container>
        <Typography variant="h2" textAlign="center" mt="20px" mb="20px">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={styles.steps}>
          <Step>
            <StepLabel>Billing</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>
        <Box className={styles.pageContent}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema[activeStep]}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                {isFirstStep && (
                  // @ts-expect-error
                  <Shipping
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};
