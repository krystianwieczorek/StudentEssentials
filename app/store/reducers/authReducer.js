const initialState = { token: null, userId: null, isSignedIn: false };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        isSignedIn: true,
      };
    case "SIGNOUT":
      return initialState;
    default:
      return initialState;
  }
};
