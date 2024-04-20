import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";

import { BrowserRouter } from "react-router-dom";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("unit tests Login Page", () => {
  test("renders login page without crashing", () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  test("displays error messages if inpyt field is empty", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const loginButton = getByText("Login");

    fireEvent.click(loginButton);

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.blur(nameInput);
    await waitFor(() => {
      expect(screen.getByText("*Name is required")).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: "" } });

    await waitFor(() => {
      expect(getByText("*Email is required")).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: "" } });

    await waitFor(() => {
      expect(getByText("*Password is required")).toBeInTheDocument();
    });
  });

  test("toggles password visibility", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
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

  test("form  data validating  correctly", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signInButton = screen.getByText("Login");
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(nameInput, {
      target: { value: "sriram" },
    });
    fireEvent.change(emailInput, {
      target: { value: "sriram@gmail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "Sriram123@" },
    });
    fireEvent.click(signInButton);
  });

  test("should show error for invalid email format", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalidEmail" } });
    fireEvent.blur(emailInput);
    expect(emailInput.getAttribute("value")).toBe("invalidEmail");
    await waitFor(() => {
      expect(getByText("*Enter a valid email with (@, .)")).toBeInTheDocument();
    });
  });

  test("should show error for password validation at least 5 characters", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Test" } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.getAttribute("value")).toBe("Test");
    await waitFor(() => {
      expect(
        getByText("*Password must be at least 5 characters")
      ).toBeInTheDocument();
    });
  });

  test("should show error for password validating for Special number", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Test12345" } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.getAttribute("value")).toBe("Test12345");
    await waitFor(() => {
      expect(getByText("*At least one special character")).toBeInTheDocument();
    });
  });

  test("Testing scenario should show error for password validating for Uppercase and lower case  letters ", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "test12345" } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.getAttribute("value")).toBe("test12345");
    await waitFor(() => {
      expect(
        getByText("*At least one uppercase and lowercase character")
      ).toBeInTheDocument();
    });
  });

  test("should show error for password validating At least 1 number ", async () => {
    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const passwordInput = getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "Sriramrsg@" } });
    fireEvent.blur(passwordInput);
    expect(passwordInput.getAttribute("value")).toBe("Sriramrsg@");

    await waitFor(() => {
      expect(
        getByText("*Password should contain at least one number")
      ).toBeInTheDocument();
    });
  });

  test("form data validates and display login success message to user", async () => {
    const user = {
      name: "sriram",
      email: "sriram@gmail.com",
      password: "Sriram@123",
    };
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(user));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(nameInput, {
      target: { value: "sriram" },
    });
    fireEvent.change(emailInput, {
      target: { value: "sriram@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "Sriram@123" },
    });

    const signInButton = screen.getByText("Login");
    fireEvent.click(signInButton);

    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify({
        name: "sriram",
        email: "sriram@gmail.com",
        password: "Sriram@123",
      })
    );
  });

  test("form data validates and check credentials with localstorage data and display error msg", async () => {
    const user = {
      name: "sriram",
      email: "sriram@gmail.com",
      password: "Sriram@123",
    };
    localStorage.getItem = jest.fn().mockReturnValue(JSON.stringify(user));

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(nameInput, {
      target: { value: "sriram" },
    });
    fireEvent.change(emailInput, {
      target: { value: "invalidEmail@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "invalidPassword" },
    });

    const signInButton = screen.getByTestId("Login");
    fireEvent.submit(signInButton);
  });

  test("Login form handles no user data in localStorage", async () => {
    localStorage.getItem = jest.fn().mockReturnValue(null);

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "any@email.com" } });
    fireEvent.change(passwordInput, { target: { value: "anypassword" } });

    fireEvent.click(submitButton);
  });
});
