import React, { useState } from "react";
import { Formik } from "formik";
import { useAppSelector } from "@/store/hooks";
import { Box, Container } from "@mui/system";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Shipping } from "./Shipping";
import {
  checkoutInitialValues,
  checkoutSchema,
} from "@/common/validationSchemas/schemas";

import styles from "./styles.module.scss";

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
            initialValues={checkoutInitialValues}
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
