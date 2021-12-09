import {
  DATA_EDIT_FAIL,
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
import axios from "axios";

// DESC: Action to get all data from backend
export const getAllData = () => async (dispatch) => {
  try {
    dispatch({ type: DATA_LIST_REQUEST });

    const { data } = await axios.get("/api/data");
    dispatch({
      type: DATA_LIST_SUCCESS,
      payload: data,
    });

    dispatch({
      type: DATA_SEARCHED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DATA_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DESC: searched data

export const getSearchedData =
  (titleKey, test = false) =>
  async (dispatch, getState) => {
    dispatch({ type: DATA_SEARCHED_REQUEST });
    let allData = [];
    if (test) {
      allData = [
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
    } else {
      const { dataList } = getState();
      allData = dataList.allData;
    }

    const resultsData = allData.filter((element) => {
      if (element.title.includes(titleKey)) {
        return element;
      }
      return false;
    });

    if (resultsData.length > 0) {
      dispatch({
        type: DATA_SEARCHED_SUCCESS,
        payload: resultsData,
      });
    } else {
      dispatch({
        type: DATA_SEARCHED_FAIL,
        payload: "No Results Found!!!",
      });
    }
  };

// DESC: Populate Edit data form

export const populateData =
  (id, test = false) =>
  async (dispatch, getState) => {
    dispatch({ type: POPULATE_DATA_REQUEST });

    let allData = [];
    if (test) {
      allData = [
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
    } else {
      const { dataList } = getState();
      allData = dataList.allData;
    }

    const editData = allData.find((element) => {
      if (element.id.toString() === id.toString()) {
        return element;
      }
      return false;
    });
    if (editData) {
      dispatch({
        type: POPULATE_DATA_SUCCESS,
        payload: editData,
      });
    } else {
      dispatch({
        type: POPULATE_DATA_FAIL,
        payload: "No Results Found!!!",
      });
    }
  };

// DESC:  Update/Edit data form with new values

export const editDataForm =
  ({ ctitle, cbody, id, cuserId }, test = false) =>
  async (dispatch, getState) => {
    dispatch({ type: DATA_EDIT_REQUEST });
    let allData = [];
    let searchedData = [];
    if (test) {
      allData = [
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
      searchedData = [
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
    } else {
      // searching in allDatalist
      const { dataList } = getState();
      allData = dataList.allData;

      // searching in searched data list
      const { dataSearched } = getState();
      searchedData = dataSearched.searchedData;
    }

    const editDataIndex = allData.findIndex((element) => {
      if (element.id.toString() === id.toString()) {
        return element;
      }
      return false;
    });

    const editDataSearchIndex = searchedData.findIndex((element) => {
      if (element.id.toString() === id.toString()) {
        return element;
      }
      return false;
    });

    if (editDataIndex + 1) {
      allData[editDataIndex] = {
        ...allData[editDataIndex],
        title: ctitle,
        body: cbody,
      };
      dispatch({
        type: DATA_EDIT_SUCCESS,
        payload: allData,
      });

      // updating the searched data list
      if (editDataSearchIndex + 1) {
        searchedData[editDataSearchIndex] = {
          ...searchedData[editDataSearchIndex],
          title: ctitle,
          body: cbody,
        };
        dispatch({
          type: DATA_SEARCHED_SUCCESS,
          payload: searchedData,
        });
      }

      // Update edit form data in store
      dispatch({
        type: POPULATE_DATA_SUCCESS,
        payload: { userId: cuserId, id: id, title: ctitle, body: cbody },
      });
    } else {
      dispatch({
        type: DATA_EDIT_FAIL,
        payload: "No Results Found!!!",
      });
    }
  };

// DESC: Search from Edit form using title and Populate Edit data form

export const searchEditDataForm =
  (title, test = false) =>
  async (dispatch, getState) => {
    dispatch({ type: POPULATE_DATA_REQUEST });

    let allData = [];
    if (test) {
      allData = [
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
    } else {
      const { dataList } = getState();
      allData = dataList.allData;
    }

    const editData = allData.find((element) => {
      if (element.title.toString() === title.toString()) {
        return element;
      }
      return false;
    });
    if (editData) {
      dispatch({
        type: POPULATE_DATA_SUCCESS,
        payload: editData,
      });
    } else {
      dispatch({
        type: POPULATE_DATA_FAIL,
        payload: "No Results Found!!!",
      });
    }
  };

// DESC: Reset Handler

export const resetAll = () => async (dispatch) => {
  dispatch({ type: RESET_EDIT_FORM });
  dispatch({ type: RESET_SEARCH_DATA });
};
