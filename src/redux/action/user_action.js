export const updateUser = (objValue) => ({
  type: "UPDATE_DATA",
  payload: objValue,
});

export const resetUser = () => ({
  type: "RESET_DATA"
});
