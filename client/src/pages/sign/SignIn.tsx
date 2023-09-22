import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
} from "@mui/material";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ApiPath } from "@/common/enums/apiPath";
import { Formik } from "formik";
import {
  signInInitialValues,
  signInSchema,
} from "@/common/validationSchemas/schemas";
import { SignInSchemaValues } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { getToken, setTemporaryToken, setToken } from "@helpers/helpers";
import { setUser } from "@/store/user/slice";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const SignIn = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isAuthenticated = getToken();

  const handleFormSubmit = async (
    values: SignInSchemaValues,
  ): Promise<void> => {
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${ApiPath.API}/auth/local`, {
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
        if (values.rememberMe) {
          setToken(data.jwt);
        } else {
          setTemporaryToken(data.jwt);
        }

        dispatch(
          setUser({
            name: data.user.username,
            email: data.user.email,
            id: data.user.id,
          }),
        );

        navigate(ApiPath.PROFILE);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const signUpText = `${t("noAccount")}? ${t("signUp")}`;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Typography variant="h1" className={styles.pageTitle}>
          {t("signIn")}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
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
                    name="rememberMe"
                    color="primary"
                    value={values.rememberMe}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                }
                label={t("rememberUser")}
              />
              <Button className={styles.button} type="submit">
                {t("signIn")}
              </Button>
            </form>
          )}
        </Formik>
        <Grid container className={styles.linksContainer}>
          <Grid item xs>
            <Link to="/" className={styles.link}>
              {t("forgotPassword")}
            </Link>
          </Grid>
          <Grid item>
            <Link to={ApiPath.SIGNUP} className={styles.link}>
              {signUpText}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
