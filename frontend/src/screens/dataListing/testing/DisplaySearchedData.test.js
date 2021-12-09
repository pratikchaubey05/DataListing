import { render, screen, fireEvent } from "../../../test-utils";
import DisplaySearchedData from "../DisplaySearchedData";

const pagenum = 1;
const searchedData = [
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut",
  },
];
const dataSearched = { loading: false };

test("display searched data test", () => {
  render(
    <DisplaySearchedData
      pagenum={pagenum}
      searchedData={searchedData}
      dataSearched={dataSearched}
    />
  );

  const cardTitle = screen.getByTestId("cardTitle");
  expect(cardTitle).toBeInTheDocument();
});

test("edit button", () => {
  render(
    <DisplaySearchedData
      pagenum={pagenum}
      searchedData={searchedData}
      dataSearched={dataSearched}
    />
  );

  const editButton = screen.getByTestId("editButton");
  expect(editButton).toBeInTheDocument();
  fireEvent.click(editButton);
  const editmodalTitle = screen.getByTestId("editmodaltitle");
  expect(editmodalTitle).toBeInTheDocument();
});
