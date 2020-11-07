export const loginAction = (token, userId) => {
  return { type: "SIGNIN", token, userId };
};
