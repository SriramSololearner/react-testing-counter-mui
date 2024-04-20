import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "../CounterMui";

describe("counter unit tests", () => {
  test("renders count with initial count of 0", () => {
    render(<Counter />);
    const rootElement = screen.getByTestId("counter-root");
    expect(rootElement).toBeInTheDocument();
  });

  test("Initial count is displayed  with 0", () => {
    render(<Counter />);
    const displayValue = screen.getByTestId("count-label");
    expect(displayValue).toHaveTextContent("count : 0");
  });

  test("increment button invokes and count value to be 1", () => {
    render(<Counter />);
    const incrementBtn = screen.getByTestId("increment");
    expect(incrementBtn).toBeDefined();
    fireEvent.click(incrementBtn);
    expect(screen.getByTestId("count-label")).toHaveTextContent("1");
  });

  test("decrement button invokes and count value to be 0", () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId("decrement");
    expect(decrementBtn).toBeDefined();
    fireEvent.click(decrementBtn);
    expect(screen.getByTestId("count-label")).toHaveTextContent("0");
  });

  test("decement button invokes and count value  does not go below zero ", () => {
    render(<Counter />);
    const decrementBtn = screen.getByTestId("decrement");
    const incrementBtn = screen.getByTestId("increment");

    for (let index = 0; index < 5; index++) {
      fireEvent.click(incrementBtn);
    }

    for (let index = 0; index < 6; index++) {
      fireEvent.click(decrementBtn);
    }

    expect(screen.getByTestId("count-label")).toHaveTextContent("0");
  });

  test("reset button invokes and count value  resets to 0", () => {
    render(<Counter />);
    const resetButton = screen.getByTestId("reset");
    const incrementBtn = screen.getByTestId("increment");

    fireEvent.click(incrementBtn);
    fireEvent.click(resetButton);
    expect(resetButton).toBeInTheDocument();

    expect(screen.getByTestId("count-label")).toHaveTextContent("0");
  });
});
