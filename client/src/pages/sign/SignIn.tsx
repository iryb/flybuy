import React, { useState } from "react";
import { Box, Container, Typography, Grid, Alert } from "@mui/material";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { SignInSchemaValues } from "@/common/types/types";
import { useAppDispatch } from "@store/hooks";
import { getToken, setTemporaryToken, setToken } from "@helpers/helpers";
import { setUser } from "@/store/user/slice";
import { useTranslation } from "react-i18next";
import { SignInForm } from "@/components/sign/SignInForm";

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
      const response = await fetch(`${ROOT}${ApiPath.AUTHAPI}/local`, {
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
        <SignInForm handleFormSubmit={handleFormSubmit} />
        <Grid container className={styles.linksContainer}>
          <Grid item xs>
            <Link to={ApiPath.FORGOTPASSWORD} className={styles.link}>
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
