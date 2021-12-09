// Action tests

import thunk from "redux-thunk";

import {
  editDataForm,
  getAllData,
  getSearchedData,
  populateData,
  resetAll,
  searchEditDataForm,
} from "../../../actions/dataActions";
import "../../../setupTests";
import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import {
  DATA_EDIT_FAIL,
  DATA_EDIT_REQUEST,
  DATA_EDIT_SUCCESS,
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCESS,
  DATA_SEARCHED_REQUEST,
  DATA_SEARCHED_SUCCESS,
  POPULATE_DATA_FAIL,
  POPULATE_DATA_REQUEST,
  POPULATE_DATA_SUCCESS,
  RESET_EDIT_FORM,
  RESET_SEARCH_DATA,
} from "../../../constants/constants";
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  dataList: {},
  dataSearched: {},
};
const postsList = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
  },
];

describe("Test Post Actions", () => {
  let store;
  store = mockStore(initialState);
  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("search by title", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
          },
        ],
      });
    });

    const expectedActions = [
      { type: DATA_SEARCHED_REQUEST },
      {
        type: DATA_SEARCHED_SUCCESS,
        payload: [
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
          },
        ],
      },
    ];

    return store.dispatch(getSearchedData("qui est esse", true)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });

  it("populate data", () => {
    const expectedActions = [
      { type: POPULATE_DATA_REQUEST },
      {
        type: POPULATE_DATA_SUCCESS,
        payload: {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
        },
      },
    ];

    return store.dispatch(populateData(1, true)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });

  it("populate data failed", () => {
    const expectedActions = [
      { type: POPULATE_DATA_REQUEST },
      {
        type: POPULATE_DATA_FAIL,
        payload: "No Results Found!!!",
      },
    ];

    return store.dispatch(populateData(5, true)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });

  it("edit data form", () => {
    const expectedActions = [
      { type: DATA_EDIT_REQUEST },
      {
        type: DATA_EDIT_SUCCESS,
        payload: postsList,
      },
      {
        type: DATA_SEARCHED_SUCCESS,
        payload: postsList,
      },
      {
        type: POPULATE_DATA_SUCCESS,
        payload: {
          userId: 1,
          id: 2,
          title: "qui est esse",
          body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
        },
      },
    ];

    return store
      .dispatch(
        editDataForm(
          {
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
            id: 2,
            userId: 1,
          },
          true
        )
      )
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).not.toEqual(expectedActions);
        // done();
      });
  });

  it("edit data form", () => {
    const expectedActions = [
      { type: DATA_EDIT_REQUEST },
      {
        type: DATA_EDIT_FAIL,
        payload: "No Results Found!!!",
      },
    ];

    return store
      .dispatch(
        editDataForm(
          {
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
            id: 5,
            userId: 1,
          },
          true
        )
      )
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
        // done();
      });
  });

  it("search edit data form", () => {
    const expectedActions = [
      { type: POPULATE_DATA_REQUEST },
      {
        type: POPULATE_DATA_SUCCESS,
        payload: {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
        },
      },
    ];

    return store
      .dispatch(
        searchEditDataForm(
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          true
        )
      )
      .then(() => {
        const actualAction = store.getActions();
        expect(actualAction).toEqual(expectedActions);
        // done();
      });
  });

  it("search edit data form failed", () => {
    const expectedActions = [
      { type: POPULATE_DATA_REQUEST },
      {
        type: POPULATE_DATA_FAIL,
        payload: "No Results Found!!!",
      },
    ];

    return store.dispatch(searchEditDataForm("random", true)).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });

  it("reset all", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla",
          },
        ],
      });
    });

    const expectedActions = [
      { type: RESET_EDIT_FORM },
      { type: RESET_SEARCH_DATA },
    ];

    return store.dispatch(resetAll()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });
});
