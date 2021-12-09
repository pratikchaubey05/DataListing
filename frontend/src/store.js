// DESC:  Creating store and combining reducers

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// All Reducer
import {
  dataListReducer,
  dataSearchedReducer,
  populateDataFormReducer,
} from "./reducer/dataReducers";

export const reducer = combineReducers({
  dataList: dataListReducer,
  dataSearched: dataSearchedReducer,
  editFormData: populateDataFormReducer,
});

const initialState = {};

// We can add more middleware.
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
