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

export const dataListReducer = (state = { allData: [] }, { type, payload }) => {
  switch (type) {
    case DATA_LIST_REQUEST:
      return { loading: true, allData: [] };
    case DATA_LIST_SUCCESS:
      return { loading: false, allData: payload };
    case DATA_LIST_FAIL:
      return { loading: false, error: payload };
    case DATA_EDIT_REQUEST:
      return { ...state, loading: true };
    case DATA_EDIT_SUCCESS:
      return { loading: false, allData: payload };
    default:
      return state;
  }
};

export const dataSearchedReducer = (
  state = { searchedData: [] },
  { type, payload }
) => {
  switch (type) {
    case DATA_SEARCHED_REQUEST:
      return { loading: true, searchedData: [] };
    case DATA_SEARCHED_SUCCESS:
      return { loading: false, searchedData: payload, pagenumber: 1 };
    case DATA_SEARCHED_FAIL:
      return { loading: false, message: payload };
    case RESET_SEARCH_DATA:
      return { loading: false, searchedData: [], pagenumber: 1 };
    default:
      return state;
  }
};

export const populateDataFormReducer = (
  state = { editForm: {} },
  { type, payload }
) => {
  switch (type) {
    case POPULATE_DATA_REQUEST:
      return { loading: true, editForm: {} };
    case POPULATE_DATA_SUCCESS:
      return { loading: false, editForm: payload };
    case POPULATE_DATA_FAIL:
      return { loading: false, editForm: {}, message: payload };
    case RESET_EDIT_FORM:
      return {
        loading: false,
        editForm: { id: "", userId: "", title: "", body: "" },
      };
    default:
      return state;
  }
};
