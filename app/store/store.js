import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

export const configureStore = createStore(rootReducer);

export default configureStore;
