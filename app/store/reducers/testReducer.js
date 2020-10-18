const initialState = { text: "asd" };

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return { ...state, text: action.text };
    default:
      return state;
  }
};
