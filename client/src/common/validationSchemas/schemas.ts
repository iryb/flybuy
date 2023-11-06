import * as yup from "yup";
import {
  CheckoutSchemaValues,
  EditProfileSchemaValues,
  ForgotPasswordSchemaValues,
  ResetPasswordSchemaValues,
  SignInSchemaValues,
  SignUpSchemaValues,
  SubscribeSchemaValues,
} from "@/common/types/types";

export const checkoutInitialValues: CheckoutSchemaValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  phoneNumber: "",
  comment: "",
};

export const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("requiredField"),
      lastName: yup.string().required("requiredField"),
      country: yup.string().required("requiredField"),
      street1: yup.string().required("requiredField"),
      street2: yup.string(),
      city: yup.string().required("requiredField"),
      state: yup.string().required("requiredField"),
      zipCode: yup.string().required("requiredField"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean().required("requiredField"),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            firstName: yup.string().required("requiredField"),
          }),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            lastName: yup.string().required("requiredField"),
          }),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            country: yup.string().required("requiredField"),
          }),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            street1: yup.string().required("requiredField"),
          }),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            street2: yup.string().required("requiredField"),
          }),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            state: yup.string().required("requiredField"),
          }),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            zipCode: yup.string().required("requiredField"),
          }),
      }),
    }),
  }),
  yup.object().shape({
    phoneNumber: yup.string().required("requiredField"),
  }),
];

export const signInInitialValues: SignInSchemaValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("requiredField")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "validEmail"),
  password: yup.string().required("requiredField"),
});

export const signUpInitialValues: SignUpSchemaValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const signUpSchema = yup.object().shape({
  name: yup.string().required("requiredField"),
  email: yup.string().required("requiredField"),
  password: yup.string().required("requiredField"),
  confirmPassword: yup
    .string()
    .required("requiredField")
    .oneOf([yup.ref("password")], "passwordsMustMatch"),
});

export const subscribeInitialValues: SubscribeSchemaValues = {
  email: "",
};

export const subscribeSchema = yup.object().shape({
  email: yup
    .string()
    .required("requiredField")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "validEmail"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("requiredField")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "validEmail"),
});

export const forgotPasswordInitialValues: ForgotPasswordSchemaValues = {
  email: "",
};

export const resetPasswordInitialValues: ResetPasswordSchemaValues = {
  password: "",
  confirmPassword: "",
};

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("requiredField"),
  confirmPassword: yup
    .string()
    .required("requiredField")
    .oneOf([yup.ref("password")], "passwordsMustMatch"),
});

export const editProfileInitialValues: EditProfileSchemaValues = {
  username: "",
  email: "",
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const editProfileSchema = yup.object().shape({
  username: yup.string(),
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "validEmail"),
  password: yup.string().required("requiredField"),
  newPassword: yup.string(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "passwordsMustMatch"),
});
