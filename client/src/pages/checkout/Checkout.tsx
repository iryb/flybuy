import React, { useState } from "react";
import { Formik } from "formik";
import { useAppSelector } from "@/store/hooks";
import { Box, Container } from "@mui/system";
import {
  Step,
  StepLabel,
  Stepper,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { Shipping } from "./Shipping";
import { Payment } from "./Payment";
import {
  checkoutInitialValues,
  checkoutSchema,
} from "@/common/validationSchemas/schemas";
import { CheckoutSchemaValues } from "@/common/types/types";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import { ApiPath } from "@enums/apiPath";
import { useTranslation } from "react-i18next";
import { Cart } from "@/components/cart/Cart";

import styles from "./styles.module.scss";

export const Checkout = (): React.ReactElement => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useAppSelector((state) => state.cart.cart);
  const { id: userId } = useAppSelector((state) => state.user.data);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string,
  );

  const makePayment = async (
    values: any,
  ): Promise<{
    error: StripeError;
  }> => {
    const stripe = (await stripePromise) as Stripe;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      userId: userId.toString(),
      email: values.email,
      products: cart.map(({ id, count, size, sku }) => ({
        id,
        count,
        size,
        sku,
      })),
    };

    const response = await fetch(ApiPath.ORDERAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    return { error };
  };

  const handleFormSubmit = async (
    values: CheckoutSchemaValues,
    actions: any,
  ): Promise<void> => {
    setActiveStep(activeStep + 1);
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
    <Box className="page">
      <Container>
        <Typography variant="h2" textAlign="center" className="pageTitle">
          {t("checkoutPageTitle")}
        </Typography>
        <Cart />
        <Divider sx={{ marginBottom: "30px" }} />
        <Stepper activeStep={activeStep} className={styles.steps}>
          <Step>
            <StepLabel>{t("billingTabTitle")}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{t("paymentTabTitle")}</StepLabel>
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
                      {t("back")}
                    </Button>
                  )}
                  <Button type="submit">
                    {isFirstStep ? t("next") : t("placeOrder")}
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
