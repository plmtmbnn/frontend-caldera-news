const initState = {
  "id": 3,
  "full_name": "",
  "email": "",
  "avatar_url": "",
  "created_at": "",
  "isAdmin": false,
  "token": ""
};

export const user = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, ...action.payload };
    case "RESET_DATA":
      return {
        "id": 3,
        "full_name": "",
        "email": "",
        "avatar_url": "",
        "created_at": "",
        "isAdmin": false,
        "token": ""
      };      
    default:
      return state;
  }
};
