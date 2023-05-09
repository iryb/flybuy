import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ApiPath } from "@/common/enums/apiPath";
import { Formik } from "formik";
import {
  signInInitialValues,
  signInSchema,
} from "@/common/validationSchemas/schemas";
import { SignInSchemaValues } from "@/common/types/types";

import styles from "./styles.module.scss";

export const SignIn = (): React.ReactElement => {
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
        console.log("logged in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={styles.pageContent}>
      <Container>
        <Typography variant="h1" className={styles.pageTitle}>
          Sign In
        </Typography>
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
