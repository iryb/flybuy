import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { getToken } from "@/helpers/helpers";
import { Navigate, useSearchParams } from "react-router-dom";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { ResetPasswordSchemaValues } from "@/common/types/types";
import {
  resetPasswordInitialValues,
  resetPasswordSchema,
} from "@/common/validationSchemas/schemas";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";

export const ResetPassword = (): React.ReactElement => {
  const { t } = useTranslation();
  const [message, setMessage] = useState({ text: "", status: "" });
  const isAuthenticated = getToken();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  const handleFormSubmit = async (
    values: ResetPasswordSchemaValues,
  ): Promise<void> => {
    try {
      const value = {
        code,
        password: values.password,
        passwordConfirmation: values.confirmPassword,
      };
      const response = await fetch(`${ROOT}${ApiPath.AUTHAPI}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setMessage({ text: t("passwordUpdated"), status: "success" });
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
        <Typography mb={3}>{t("forgotPasswordText")}</Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={resetPasswordInitialValues}
          validationSchema={resetPasswordSchema}
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
                name="password"
                label={t("password")}
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={
                  touched.password && errors.password && t(errors.password)
                }
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                name="confirmPassword"
                label={t("confirmPassword")}
                type="password"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={
                  touched.confirmPassword &&
                  errors.confirmPassword &&
                  t(errors.confirmPassword)
                }
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
