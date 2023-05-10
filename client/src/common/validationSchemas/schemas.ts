import * as yup from "yup";
import {
  CheckoutSchemaValues,
  SignInSchemaValues,
  SignUpSchemaValues,
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
  email: "",
  phoneNumber: "",
};

export const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean().required("required"),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            firstName: yup.string().required("required"),
          }),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            lastName: yup.string().required("required"),
          }),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            country: yup.string().required("required"),
          }),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            street1: yup.string().required("required"),
          }),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            street2: yup.string().required("required"),
          }),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            state: yup.string().required("required"),
          }),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup.object({
            zipCode: yup.string().required("required"),
          }),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export const signInInitialValues: SignInSchemaValues = {
  email: "",
  password: "",
};

export const signInSchema = yup.object().shape({
  email: yup.string().required("required"),
  password: yup.string().required("required"),
});

export const signUpInitialValues: SignUpSchemaValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const signUpSchema = yup.object().shape({
  name: yup.string().required("reduired"),
  email: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
