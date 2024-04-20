import { fireEvent, render, waitFor } from "@testing-library/react";

import Home from "../HomePage";
import { BrowserRouter } from "react-router-dom";

describe("Home Page Unit Tests", () => {
  test("Testing for renders Home page without crashing", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const profileComponent = getByTestId("profile");
    expect(profileComponent).toBeInTheDocument();
    const mainPage = getByTestId("main");
    expect(mainPage).toBeInTheDocument();
  });

  test("Testing componentDidMount sets state from localStorage", () => {
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue(
        JSON.stringify({
          name: "John",
          email: "john@example.com",
          password: "password123",
          contact: "1234567890",
        })
      ),
    };
    Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

    const { getByTestId } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(getByTestId("user-email")).toHaveTextContent("john@example.com");
    expect(getByTestId("user-name")).toHaveTextContent("John");
  });

  test("Testing handleOpen sets open state to true", () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    fireEvent.click(getByText("Edit Profile"));
    expect(getByTestId("modal")).toHaveAttribute("open", "true");
  });

  test("Testing handlerUpload updates image URL correctly", () => {
    window.URL.createObjectURL = jest.fn();
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(getByText("Edit Profile")).toBeInTheDocument();
    fireEvent.click(getByText("Edit Profile"));
    expect(getByTestId("modal")).toBeInTheDocument();

    const fileInput = getByTestId("inputFile");
    const file = new File(["image content"], "profile.jpg", {
      type: "image/jpeg",
    });
    fireEvent.change(fileInput, {
      target: { files: [file] },
    });
  });

  test("Testing handle onChange trigers updating state value", () => {
    const { getByTestId, getByText, getByPlaceholderText, getByDisplayValue } =
      render(
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      );

    expect(getByText("Edit Profile")).toBeInTheDocument();
    fireEvent.click(getByText("Edit Profile"));
    expect(getByTestId("modal")).toBeInTheDocument();
    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });
    expect(getByDisplayValue("newemail@example.com")).toBeInTheDocument();
  });

  test("Testing handle submit calling submit function", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Edit Profile"));
    expect(getByTestId("modal")).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "newemail@example.com" },
    });

    fireEvent.click(getByText("Save"));
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({
          name: "sriram",
          email: "newemail@example.com",
          password: "Sriram123@",
          contact: "4567891235",
          imgUrl: "dlkfklfkld",
        })
      );
      expect(getByTestId("modal")).toHaveAttribute("open", "false");
    });
  });

  test("Testing handlerLogout removes user data from localStorage and redirects to login page", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    fireEvent.click(getByText("Logout"));
    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
  });
});
