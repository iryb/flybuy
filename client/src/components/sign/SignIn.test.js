import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SignInForm } from "@components/sign/SignInForm";
import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../translation/i18n";

describe("Sign In Form", () => {
  test("Data should be passed when form is submitted", async () => {
    const handleFormSubmit = jest.fn();
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <SignInForm handleFormSubmit={handleFormSubmit} />
        </I18nextProvider>
      </MemoryRouter>,
    );
    const emailAddress = screen.getByRole("textbox", {
      name: /email/i,
    });
    await user.type(emailAddress, "testemail@test.com");

    const password = screen.getByLabelText(/password/i);
    await user.type(password, "test");

    const submit = screen.getByRole("button");

    await user.click(submit);

    await waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    });
  });

  test("Email should have email address validation", async () => {
    const handleFormSubmit = jest.fn();
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <SignInForm handleFormSubmit={handleFormSubmit} />
        </I18nextProvider>
      </MemoryRouter>,
    );
    const emailAddress = screen.getByRole("textbox", {
      name: /email/i,
    });
    await user.type(emailAddress, "testemail@");

    await waitFor(() => {
      expect(emailAddress).toHaveValue("testemail@");
    });

    const submit = screen.getByRole("button");

    await user.click(submit);

    expect(await screen.findByText(/email must be valid/i)).toBeVisible();
  });
});
