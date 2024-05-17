const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
    password: "",
    description: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const clearUser = () => ({
  type: "CLEAR_USER",
});

export default reducer;
