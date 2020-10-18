import { createSelector } from "reselect";

const testSelect = (state) => state.test;

export const testSelector = createSelector(testSelect, (state) => state.text);
