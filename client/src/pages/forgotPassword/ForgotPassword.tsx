import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getToken } from "@/helpers/helpers";
import { Navigate } from "react-router-dom";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { ForgotPasswordSchemaValues } from "@/common/types/types";
import {
  forgotPasswordInitialValues,
  forgotPasswordSchema,
} from "@/common/validationSchemas/schemas";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";

export const ForgotPassword = (): React.ReactElement => {
  const { t } = useTranslation();
  const [message, setMessage] = useState({ text: "", status: "" });
  const isAuthenticated = getToken();

  const handleFormSubmit = async (
    values: ForgotPasswordSchemaValues,
  ): Promise<void> => {
    try {
      const value = {
        email: values.email,
      };
      const response = await fetch(
        `${ROOT}${ApiPath.AUTHAPI}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        },
      );

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setMessage({ text: t("checkEmail"), status: "success" });
      }
    } catch (error: any) {
      setMessage({ text: t("cantResetPassword"), status: "error" });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box className="page alignCenter">
      <Container maxWidth="sm">
        <Typography variant="h1" className="pageTitle">
          {t("forgotPasswordPageTitle")}
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={forgotPasswordInitialValues}
          validationSchema={forgotPasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t("email")}
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email && t(errors.email)}
                sx={{ marginBottom: "15px" }}
              />
              <Button type="submit">{t("send")}</Button>
            </form>
          )}
        </Formik>
        {message.text && (
          <Typography
            className={message.status === "error" ? "error" : "success"}
            sx={{ marginTop: "5px" }}
          >
            {message.text}
          </Typography>
        )}
      </Container>
    </Box>
  );
};
