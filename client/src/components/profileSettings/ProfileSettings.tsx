import React, { useState } from "react";
import { Formik } from "formik";
import {
  editProfileInitialValues,
  editProfileSchema,
} from "@/common/validationSchemas/schemas";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EditProfileSchemaValues } from "@/common/types/types";
import { getDirtyValues, getToken } from "@/helpers/helpers";
import { ApiPath, ROOT } from "@/common/enums/apiPath";
import { Auth } from "@/common/enums/auth";
import { fetchUser } from "@/store/user/slice";

export const ProfileSettings = (): React.ReactElement => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const [message, setMessage] = useState({ text: "", status: "" });
  const dispatch = useAppDispatch();
  const authToken = getToken() as string;

  const handleFormSubmit = async (
    values: EditProfileSchemaValues,
  ): Promise<void> => {
    const payload = getDirtyValues<EditProfileSchemaValues>(
      values,
      editProfileInitialValues,
    );

    try {
      const response = await fetch(`${ROOT}${ApiPath.USERAPI}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        setMessage({ text: t("profileUpdated"), status: "success" });
        void dispatch(fetchUser(authToken));
      }
    } catch (error: any) {
      setMessage({ text: t("cantUpdateProfile"), status: "error" });
    }

    if ("newPassword" in payload) {
      try {
        const value = {
          currentPassword: values.password,
          password: values.newPassword,
          passwordConfirmation: values.confirmNewPassword,
        };
        const response = await fetch(
          `${ROOT}${ApiPath.AUTHAPI}/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${Auth.BEARER} ${authToken}`,
            },
            body: JSON.stringify(value),
          },
        );

        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          setMessage({ text: t("passwordUpdated"), status: "success" });
        }
      } catch (error: any) {
        setMessage({ text: t("cantUpdatePassword"), status: "error" });
      }
    }
  };

  return (
    <Box>
      <Container maxWidth="sm">
        <Card variant="outlined" sx={{ marginBottom: "15px" }}>
          <CardContent>
            <Typography>
              <strong>{t("username")}: </strong>
              {user.name}
            </Typography>
            <Typography>
              <strong>{t("email")}: </strong>
              {user.email}
            </Typography>
          </CardContent>
        </Card>
        <Typography variant="h5" mb={2}>
          {t("profileUpdate")}
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={editProfileInitialValues}
          validationSchema={editProfileSchema}
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
                label={t("username")}
                name="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={
                  touched.username && errors.username && t(errors.username)
                }
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
                name="newPassword"
                label={t("newPassword")}
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={
                  touched.newPassword &&
                  errors.newPassword &&
                  t(errors.newPassword)
                }
                sx={{ marginBottom: "15px" }}
              />
              <TextField
                fullWidth
                name="confirmNewPassword"
                label={t("confirmNewPassword")}
                type="password"
                value={values.confirmNewPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={
                  touched.confirmNewPassword &&
                  Boolean(errors.confirmNewPassword)
                }
                helperText={
                  touched.confirmNewPassword &&
                  errors.confirmNewPassword &&
                  t(errors.confirmNewPassword)
                }
                sx={{ marginBottom: "15px" }}
              />
              <Button type="submit">{t("update")}</Button>
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
