import alertReducer from "./alertReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const allReducers = combineReducers({
  alert: alertReducer,
  auth: authReducer,
});

export default allReducers;
