export const loginAction = (token, userId, groupId) => {
  return { type: "SIGNIN", token, userId, groupId };
};
