interface CheckoutSchemaValues {
  billingAddress: {
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingAddress: {
    isSameAddress: boolean;
    firstName: string;
    lastName: string;
    country: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber: string;
  comment: string;
}

interface SignInSchemaValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignUpSchemaValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SubscribeSchemaValues {
  email: string;
}

interface CouponSchemaValues {
  coupon: string;
}

interface ForgotPasswordSchemaValues {
  email: string;
}

interface ResetPasswordSchemaValues {
  password: string;
  confirmPassword: string;
}

export type {
  CheckoutSchemaValues,
  SignInSchemaValues,
  SignUpSchemaValues,
  SubscribeSchemaValues,
  CouponSchemaValues,
  ForgotPasswordSchemaValues,
  ResetPasswordSchemaValues,
};
