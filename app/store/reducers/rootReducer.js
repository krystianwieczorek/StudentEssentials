import { combineReducers } from "redux";
import { globalReducer } from "./globalReducer";

const rootReducer = combineReducers({
  reducer: globalReducer,
});

export default rootReducer;
