const initState = {
  "id": 3,
  "full_name": "",
  "email": "",
  "avatar_url": "",
  "created_at": "",
  "isAdmin": false,
  "isAuthor": false,
  "token": "xxx",
  "author_id": ""
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
        "isAuthor": false,
        "token": "xxx",
        "author_id": ""
      };      
    default:
      return state;
  }
};
