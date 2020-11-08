import { createSelector } from "reselect";

const globalSelector = (state) => state.reducer;

export const authSelector = createSelector(
  globalSelector,
  (state) => state.token
);

export const userIdSelector = createSelector(
  globalSelector,
  (state) => state.userId
);

export const isSignedInSelector = createSelector(
  globalSelector,
  (state) => state.isSignedIn
);

export const updateGroupSelector = createSelector(
  globalSelector,
  (state) => state.groupId
);
