import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders learn react link", () => {
  render(<Header />);
  const headerLogo = screen.getByText(/Data Listing/i);
  expect(headerLogo).toBeInTheDocument();
});
