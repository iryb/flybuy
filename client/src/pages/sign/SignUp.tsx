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
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { Formik } from "formik";
import {
  signUpInitialValues,
  signUpSchema,
} from "@/common/validationSchemas/schemas";
import { SignUpSchemaValues } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { getToken, setToken } from "@helpers/helpers";
import { setUser } from "@/store/user/slice";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

export const SignUp = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isAuthenticated = getToken();

  const handleFormSubmit = async (
    values: SignUpSchemaValues,
  ): Promise<void> => {
    try {
      const value = {
        username: values.name,
        email: values.email,
        password: values.password,
      };
      const response = await fetch(`${ROOT}${ApiPath.AUTHAPI}/local/register`, {
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
        setToken(data.jwt);

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
  const signInText = `${t("hasAccount")}? ${t("signIn")}`;

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Typography variant="h1" className={styles.pageTitle}>
          {t("signUp")}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={signUpInitialValues}
          validationSchema={signUpSchema}
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
                label={t("name")}
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name && t(errors.name)}
                sx={{ marginBottom: "15px" }}
              />
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
              <Button className={styles.button} type="submit">
                {t("signUp")}
              </Button>
            </form>
          )}
        </Formik>
        <Grid container className={styles.linksContainer}>
          <Grid item>
            <Link to={ApiPath.SIGNIN} className={styles.link}>
              {signInText}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
