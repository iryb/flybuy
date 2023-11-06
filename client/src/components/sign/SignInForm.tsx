import React from "react";
import {
  signInInitialValues,
  signInSchema,
} from "@/common/validationSchemas/schemas";
import { SignInSchemaValues } from "@/common/types/types";
import { Formik } from "formik";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SignInFormProps {
  handleFormSubmit: (values: SignInSchemaValues) => Promise<void>;
}

export const SignInForm = ({
  handleFormSubmit,
}: SignInFormProps): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={signInInitialValues}
        validationSchema={signInSchema}
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
              id="email"
              label={t("email")}
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email && t(errors.email)}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              fullWidth
              id="password"
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
            <FormControlLabel
              control={
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  color="primary"
                  value={values.rememberMe}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              }
              label={t("rememberUser")}
            />
            <Button type="submit" sx={{ marginTop: "30px" }}>
              {t("signIn")}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};
