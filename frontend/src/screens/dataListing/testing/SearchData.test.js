import { render, screen, fireEvent } from "../../../test-utils";
import SearchData from "../SearchData";

test("Default Display of search by title label", () => {
  render(<SearchData />);

  // Checking if input label is present
  const searchLabel = screen.getByText(/Search by Title:/i);
  expect(searchLabel).toBeInTheDocument();
});

test("Button search is present and is enabled", () => {
  render(<SearchData />);
  // Checking if the button search is present
  const searchButton = screen.getByRole("button", { name: /Search/i });
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeEnabled();
});

test("Button reset All is present and is enabled", () => {
  render(<SearchData />);
  // Checking if the button reset is present
  const resetButton = screen.getByRole("button", { name: /Reset All/i });
  expect(resetButton).toBeInTheDocument();
  expect(resetButton).toBeEnabled();
  fireEvent.click(resetButton);
});

test("Input Box for search by title is present and is empty by default", () => {
  render(<SearchData />);
  // Checking if the title input box is present and Empty by default

  const titleInput = screen.getByRole("input");
  expect(titleInput).toBeInTheDocument();
  expect(titleInput).not.toHaveValue();
});
