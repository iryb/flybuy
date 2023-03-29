import React, { useState } from "react";
import { Formik } from "formik";
import { useAppSelector } from "@/store/hooks";
import { Box, Container } from "@mui/system";
import { Step, StepLabel, Stepper, Typography, Button } from "@mui/material";
import { Shipping } from "./Shipping";
import { Payment } from "./Payment";
import {
  checkoutInitialValues,
  checkoutSchema,
} from "@/common/validationSchemas/schemas";
import { CheckoutSchemaValues } from "@/common/types/types";
import { loadStripe } from "@stripe/stripe-js";
import { ApiPath } from "@enums/apiPath";

import styles from "./styles.module.scss";

export const Checkout = (): React.ReactElement => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const stripePromise = loadStripe(
    process.env.STRIPE_PUBLISHABLE_KEY as string,
  );

  const makePayment = async (values: any): Promise<void> => {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch(ApiPath.ORDERAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();

    await stripe?.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const handleFormSubmit = async (
    values: CheckoutSchemaValues,
    actions: any,
  ): Promise<void> => {
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      await makePayment(values);
    }

    actions.setTouched({});
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
                {isSecondStep && (
                  // @ts-expect-error
                  <Payment
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                <Box className={styles.checkoutButtons}>
                  {isSecondStep && (
                    <Button onClick={() => setActiveStep(activeStep - 1)}>
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    {isFirstStep ? "Next" : "Place Order"}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};
