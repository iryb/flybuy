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
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setToken } from "@helpers/helpers";
import { setUser } from "@/store/user/slice";

import styles from "./styles.module.scss";

export const SignIn = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useAppSelector((state) => state.user.data);

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
        setToken(data.jwt);

        dispatch(
          setUser({
            name: data.user.username,
            email: data.user.email,
          }),
        );

        navigate(ApiPath.PROFILE);
      }
    } catch (error) {
      // @ts-expect-error
      setError(error.message);
    }
  };

  if (user.name) {
    return <Navigate to="/" />;
  }

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Typography variant="h1" className={styles.pageTitle}>
          Sign In
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
                label="Email Address"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ marginBottom: "15px" }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button className={styles.button} type="submit">
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        <Grid container className={styles.linksContainer}>
          <Grid item xs>
            <Link to="/" className={styles.link}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to={ApiPath.SIGNUP} className={styles.link}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
