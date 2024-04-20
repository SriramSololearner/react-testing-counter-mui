import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Register from "../RegistrationForm";
import { BrowserRouter } from "react-router-dom";

describe("Register Page unit Tests", () => {
  jest.useFakeTimers(); // Mock the timers:

  test("Testing renders register page without crashing", () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Contact")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  test("Yes Testing for displaying  error messages for invalid input data", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const contactInput = getByLabelText("Contact");
    const registerButton = getByText("Register");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.blur(nameInput);
    await waitFor(() => {
      expect(screen.getByText("*Name is required")).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.change(passwordInput, { target: { value: "password" } });

    fireEvent.change(contactInput, { target: { value: "" } });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByText("*Name is required")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText("*Email is required")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText("*Password is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText("*Contact is required")).toBeInTheDocument();
    });
  });

  test("Testing for the scenario should show error for invalid email format", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(getByText("*Enter a valid email with (@, .)")).toBeInTheDocument();
    });
  });

  test("Testing scenario should show error for password validation at least 5 characters", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Test" } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(
        getByText("*Password must be at least 5 characters")
      ).toBeInTheDocument();
    });
  });

  test(" Testing for should show error for password validating for Special number", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Test12345" } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(getByText("*At least one special character")).toBeInTheDocument();
    });
  });

  test("Testing for should show error for password validating for Uppercase and lower case  letters ", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "test12345" } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(
        getByText("*At least one uppercase and lowercase character")
      ).toBeInTheDocument();
    });
  });

  test("Testing should show error for password validating At least 1 number ", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Sriramrsg@" } });
    fireEvent.blur(passwordInput);
    await waitFor(() => {
      expect(
        getByText("*Password should contain at least one number")
      ).toBeInTheDocument();
    });
  });

  test("Testing toggles password visibility", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const passwordInput = getByTestId("password-input");

    const visibilityToggle = getByTestId("VisibilityIcon");
    fireEvent.click(visibilityToggle);
    const visibilityOff = getByTestId("VisibilityOffIcon");
    expect(visibilityOff).toBeVisible();
    expect(visibilityToggle).not.toBeVisible();
    expect(passwordInput.getAttribute("type")).toBe("text");

    fireEvent.click(visibilityOff);
    expect(passwordInput.getAttribute("type")).toBe("password");
    expect(visibilityOff).not.toBeVisible();
  });

  test("Testing form  data validates  and display Success message to user", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const signUpButton = screen.getByText("Register");
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const contactInput = screen.getByTestId("contact-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(nameInput, {
      target: { value: "sriram" },
    });
    fireEvent.change(emailInput, {
      target: { value: "sriram@gmail.com" },
    });
    fireEvent.change(contactInput, {
      target: { value: "9123564870" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Sriram123@" },
    });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(
        screen.getByText("User successfully Registered")
      ).toBeInTheDocument();
    });
  });
});
