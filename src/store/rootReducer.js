import { combineReducers } from "redux";
import { studentDataReducer } from "../containers/auth/state/reducers";
export const rootReducer = combineReducers({
  auth: studentDataReducer,
});
