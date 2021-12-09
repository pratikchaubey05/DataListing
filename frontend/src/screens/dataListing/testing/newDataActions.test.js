import thunk from "redux-thunk";
import { getAllData, getSearchedData } from "../../../actions/dataActions";
import "../../../setupTests";
import expect from "expect";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import {
  DATA_LIST_REQUEST,
  DATA_LIST_SUCCESS,
  DATA_SEARCHED_REQUEST,
  DATA_SEARCHED_SUCCESS,
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
  beforeEach(() => {
    moxios.install();
    store = mockStore(initialState);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("Loads all posts correctly", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [...postsList],
      });
    });

    const expectedActions = [
      {
        type: DATA_LIST_REQUEST,
      },
      {
        type: DATA_LIST_SUCCESS,
        payload: postsList,
      },
      {
        type: DATA_SEARCHED_SUCCESS,
        payload: postsList,
      },
    ];
    return store.dispatch(getAllData()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
    });
  });

  it("Returns error action when no posts found", () => {
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: "error message",
      });
    });

    const expectedActions = [
      { type: DATA_LIST_REQUEST },
      {
        type: "DATA_LIST_FAIL",
        payload: "Request failed with status code 400",
      },
    ];
    return store.dispatch(getAllData()).then(() => {
      const actualAction = store.getActions();
      expect(actualAction).toEqual(expectedActions);
      // done();
    });
  });
});
