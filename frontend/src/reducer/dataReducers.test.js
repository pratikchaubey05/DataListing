import {
  dataListReducer,
  dataSearchedReducer,
  populateDataFormReducer,
} from "./dataReducers";
import {
  DATA_EDIT_REQUEST,
  DATA_EDIT_SUCCESS,
  DATA_LIST_FAIL,
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCESS,
  DATA_SEARCHED_FAIL,
  DATA_SEARCHED_REQUEST,
  DATA_SEARCHED_SUCCESS,
  POPULATE_DATA_FAIL,
  POPULATE_DATA_REQUEST,
  POPULATE_DATA_SUCCESS,
  RESET_EDIT_FORM,
  RESET_SEARCH_DATA,
} from "../constants/constants";

const initialState = { allData: [] };

// const MOCK_POST_LIST = [
//     {​​​​​​​​
//       id: 1,
//       userId: 1,
//       title: 'test 1',
//       body: 'post Body 1',
//     }​​​​​​​​,
//     {​​​​​​​​
//       id: 2,
//       userId: 1,
//       title: 'test 2',
//       body: 'post Body 2',
//     }​​​​​​​​,
//     {​​​​​​​​
//       id: 3,
//       userId: 1,
//       title: 'test 3',
//       body: 'post Body 3',
//     }​​​​​​​​
//   ];

//   const MOCK_POST_ITEM = {​​​​​​​​
//     id: 3,
//     title: 'test title',
//     body: 'test post',
//   }​​​​​​​​;

test("Get request is in pending state", () => {
  const expectedoutput = { loading: true, allData: [] };
  expect(dataListReducer(initialState, { type: DATA_LIST_REQUEST })).toEqual({
    loading: true,
    allData: [],
  });
});

const mockData = [
  {
    id: 1,
    userId: 1,
    title: "sample title 1",
    body: "sample body 1",
  },
  {
    id: 2,
    userId: 2,
    title: "sample title 2",
    body: "sample body 2",
  },
  {
    id: 1,
    userId: 1,
    title: "sample title 2",
    body: "sample body 2",
  },
];

test("Get data", () => {
  const expectedoutput = { loading: false, allData: mockData };

  expect(
    dataListReducer(initialState, {
      type: DATA_LIST_SUCCESS,
      payload: mockData,
    })
  ).toEqual(expectedoutput);
});

test("Get data failed ", () => {
  const expectedoutput = { loading: false, error: "error message" };

  expect(
    dataListReducer(initialState, {
      type: DATA_LIST_FAIL,
      payload: "error message",
    })
  ).toEqual(expectedoutput);
});

test("edit data request ", () => {
  const expectedoutput = { loading: true, allData: [] };

  expect(
    dataListReducer(initialState, {
      type: DATA_EDIT_REQUEST,
      payload: { allData: [] },
    })
  ).toEqual(expectedoutput);
});

test("Edit data success ", () => {
  const expectedoutput = { loading: false, allData: mockData };

  expect(
    dataListReducer(initialState, {
      type: DATA_EDIT_SUCCESS,
      payload: mockData,
    })
  ).toEqual(expectedoutput);
});

test("Data search success ", () => {
  const expectedoutput = {
    loading: false,
    searchedData: {
      id: 1,
      userId: 1,
      title: "sample title 1",
      body: "sample body 1",
    },
    pagenumber: 1,
  };

  expect(
    dataSearchedReducer(
      { searchedData: [] },
      {
        type: DATA_SEARCHED_SUCCESS,
        payload: {
          id: 1,
          userId: 1,
          title: "sample title 1",
          body: "sample body 1",
        },
      }
    )
  ).toEqual(expectedoutput);
});

test("reset search data ", () => {
  const expectedoutput = { loading: false, searchedData: [], pagenumber: 1 };

  expect(
    dataSearchedReducer(
      { searchedData: [] },
      {
        type: RESET_SEARCH_DATA,
        payload: "reset",
      }
    )
  ).toEqual(expectedoutput);
});

test("populate data request ", () => {
  const expectedoutput = { loading: true, editForm: {} };

  expect(
    populateDataFormReducer(
      { editForm: {} },
      {
        type: POPULATE_DATA_REQUEST,
        payload: {},
      }
    )
  ).toEqual(expectedoutput);
});

const mockSingleData = {
  id: 1,
  userId: 1,
  title: "sample title 1",
  body: "sample body 1",
};

test("populate data request success", () => {
  const expectedoutput = { loading: false, editForm: mockSingleData };

  expect(
    populateDataFormReducer(
      { editForm: {} },
      {
        type: POPULATE_DATA_SUCCESS,
        payload: mockSingleData,
      }
    )
  ).toEqual(expectedoutput);
});

test("populate data request failed ", () => {
  const expectedoutput = {
    loading: false,
    editForm: {},
    message: "error message",
  };

  expect(
    populateDataFormReducer(
      { editForm: {} },
      {
        type: POPULATE_DATA_FAIL,
        payload: "error message",
      }
    )
  ).toEqual(expectedoutput);
});

test("Reset edit form", () => {
  const expectedoutput = {
    loading: false,
    editForm: { id: "", userId: "", title: "", body: "" },
  };

  expect(
    populateDataFormReducer(
      { editForm: {} },
      {
        type: RESET_EDIT_FORM,
        payload: "reset",
      }
    )
  ).toEqual(expectedoutput);
});
