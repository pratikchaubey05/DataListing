import { render, screen } from "../../../test-utils";
import DisplayData from "../DisplayData";

const element = {
  id: 1,
  title: "sample title",
  body: "sample body data",
};
const editHandler = () => {
  console.log("working");
};

test("Default Display of search by title label", () => {
  render(<DisplayData editHandler={editHandler} data={element} />);

  const cardTitle = screen.getByTestId("cardTitle");
  expect(cardTitle).toBeInTheDocument();
});
