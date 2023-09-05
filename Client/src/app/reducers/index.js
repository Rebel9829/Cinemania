import alertReducer from "./alertReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
    alert: alertReducer,
});

export default allReducers;