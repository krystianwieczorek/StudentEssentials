const initialState = {
  token: null,
  userId: null,
  isSignedIn: false,
  groupId: null,
  flag: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isSignedIn: true,
        groupId: action.groupId,
      };
    case "SIGNOUT":
      return initialState;
    case "REFRESH":
      return { ...state, flag: action.flag };
    case "UPDATEGROUP":
      return {
        ...state,
        groupId: action.groupId,
      };
    default:
      return initialState;
  }
};
