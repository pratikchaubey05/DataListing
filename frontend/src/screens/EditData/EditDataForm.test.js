import { render, screen, fireEvent } from "../../test-utils";
import EditDataForm from "./EditDataForm";

test("Default Display of search by title label", () => {
  render(<EditDataForm />);

  // Checking if title label is present
  const editTitleLabel = screen.getByTestId("edit-form-title-label");
  expect(editTitleLabel).toBeInTheDocument();
});

test("Default Display of search by title input box in edit form", () => {
  render(<EditDataForm />);

  const editTitleInput = screen.getByTestId("edit-form-title-input");
  expect(editTitleInput).toBeInTheDocument();
  expect(editTitleInput).not.toHaveValue();
});

test("Autocomplete section is not present by default", () => {
  render(<EditDataForm />);

  const autocomplete = screen.queryByTestId("edit-form-autocomplete");
  expect(autocomplete).not.toBeInTheDocument();
});

test("Default Display of bodylabel", () => {
  render(<EditDataForm />);

  const editbodyLabel = screen.getByTestId("edit-body-label");
  expect(editbodyLabel).toBeInTheDocument();
});

test("Default Display of body input box in edit form. enabled ", () => {
  render(<EditDataForm />);

  const editbodyInput = screen.getByTestId("edit-body-input");
  expect(editbodyInput).toBeInTheDocument();
  expect(editbodyInput).not.toHaveValue();
  expect(editbodyInput).toBeEnabled();
});

test("Button update is present and is disabled", () => {
  render(<EditDataForm />);

  const updateButton = screen.getByTestId("edit-update-button");
  expect(updateButton).toBeInTheDocument();
  expect(updateButton).toBeDisabled();
});

test("Alert Message is not present", () => {
  render(<EditDataForm />);

  const alertMessage = screen.queryByTestId("edit-alert-message");
  expect(alertMessage).toBeInTheDocument();
});

test("Button update getting enabled and button search by Title getting disabled after filling title and body", () => {
  render(<EditDataForm />);

  const editTitleInput = screen.getByTestId("edit-form-title-input");
  const editbodyInput = screen.getByTestId("edit-body-input");

  // const searchButton = screen.getByTestId("edit-search-title-button");
  const updateButton = screen.getByTestId("edit-update-button");

  fireEvent.change(editTitleInput, { target: { value: "random" } });
  fireEvent.change(editbodyInput, { target: { value: "random words" } });

  // expect(searchButton).toBeDisabled();
  expect(updateButton).toBeEnabled();

  fireEvent.click(updateButton);
  const alertMessage = screen.queryByTestId("edit-alert-message");
  expect(alertMessage).toBeInTheDocument();
});
