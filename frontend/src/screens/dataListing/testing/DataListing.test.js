import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, fireEvent, waitFor } from "../../../test-utils";
import DataListing from "../DataListing";
import { userEvent } from "@testing-library/user-event";

test("Checking if search functionality is working. cards are getting displayed. Text of number of matches found is displayed", async () => {
  render(<DataListing />);

  // Checking if text matches found is disaplayed

  const matchFoundText = screen.queryByTestId("match-found-text");
  expect(matchFoundText).not.toBeInTheDocument();

  const titleInput = screen.getByRole("input");
  const searchButton = screen.getByRole("button", { name: /Search/i });

  expect(titleInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  fireEvent.change(titleInput, { target: { value: "sunt" } });
  fireEvent.click(searchButton);
});

test("Checking if pagination is displayed for initial search", () => {
  render(<DataListing />);

  const paginationele = screen.queryByTestId("pagination");
  expect(paginationele).toBeInTheDocument();
});
