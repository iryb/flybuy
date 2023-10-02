import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";
import { useFormik } from "formik";
import {
  subscribeInitialValues,
  subscribeSchema,
} from "@/common/validationSchemas/schemas";
import { SubscribeSchemaValues } from "@/common/types/types";
import { ApiPath } from "@/common/enums/apiPath";

export const Subscribe = (): React.ReactElement => {
  const [message, setMessage] = useState({ text: "", status: "" });
  const { t } = useTranslation();

  const handleSubscribe = async (
    values: SubscribeSchemaValues,
  ): Promise<void> => {
    setMessage({ text: "", status: "" });

    const requestBody = {
      email: values.email,
    };

    const response = await fetch(ApiPath.SUBSCRIBERAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const { error, data } = await response.json();

    if (data) {
      setMessage({ text: t(data.message), status: "" });
    }

    if (error) setMessage({ text: t(error.message), status: "error" });
  };

  const formik = useFormik({
    initialValues: subscribeInitialValues,
    validationSchema: subscribeSchema,
    onSubmit: (values, { resetForm }) => {
      void handleSubscribe(values);
      resetForm();
    },
  });

  return (
    <Box className={styles.section}>
      <Container>
        <Typography variant="h3">{t("subscribeTitle")}</Typography>
        <Typography className={styles.subtitle}>
          {t("subscribeText")}
        </Typography>
        <Box className={styles.subscribeField}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              placeholder={t("subscibeEmailText")}
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={styles.input}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                t(formik.errors.email)
              }
              sx={{
                ".MuiInputBase-root": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            />
            <Button
              type="submit"
              className={styles.button}
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              {t("subscribeBtnText")}
            </Button>
          </form>
        </Box>
        {message.text && (
          <Typography
            className={message.status === "error" ? "error" : "success"}
            sx={{ marginTop: "15px" }}
          >
            {message.text}
          </Typography>
        )}
      </Container>
    </Box>
  );
};
