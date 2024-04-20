import { render, waitFor } from "@testing-library/react";
import DisplayUserData from "../DisplayUserData";

const users = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    firstName: "George",
    lastName: "Bluth",
    image: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  // Add more user data as needed
];

describe("DisplayUserData Component", () => {
  beforeEach(() => {
    // Mock the fetch API to return sample data
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Restore mock after each test
    jest.restoreAllMocks();
  });

  test("renders user data cards correctly", async () => {
    const responseData = {
      users: [
        {
          id: 1,
          email: "george.bluth@reqres.in",
          firstName: "George",
          lastName: "Bluth",
          image: "https://reqres.in/img/faces/1-image.jpg",
        },
        {
          id: 2,
          email: "janet.weaver@reqres.in",
          firstName: "Janet",
          lastName: "Weaver",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
        // Add more user data as needed
      ],
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => responseData,
    } as Response);

    // Render your component and perform assertions here
    const { findByAltText, findByTestId } = render(<DisplayUserData />);
    await waitFor(() => {
      const emailElement = findByTestId("user-email");
      const nameElement = findByTestId("user-name");
      const avatarElement = findByAltText("user-profile");
      expect(avatarElement).toBeInTheDocument();
      expect(emailElement).toHaveTextContent(/george\.bluth@reqres\.in/i);
      expect(nameElement).toHaveTextContent(/George Bluth/i);
    });
  });

  // test("displays error message if API call fails", async () => {
  //   // Mock the fetch API to return an error response
  //   jest
  //     .spyOn(global, "fetch")
  //     .mockRejectedValueOnce(new Error("Failed to fetch"));
  //   const { findByTestId } = render(<DisplayUserData />);

  //   // Wait for error message to be displayed
  //   await waitFor(() => {
  //     const errorMessage = findByTestId(/err-msg/i);
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
});
