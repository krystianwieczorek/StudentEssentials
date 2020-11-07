import { createSelector } from "reselect";

const authSelect = (state) => state.auth;

export const authSelector = createSelector(authSelect, (state) => state.token);
export const userIdSelector = createSelector(
  authSelect,
  (state) => state.userId
);
export const isSignedInSelector = createSelector(
  authSelect,
  (state) => state.isSignedIn
);
