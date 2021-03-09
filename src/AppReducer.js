import { saveSessionData } from "./utils";


const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("Action: ", action, state);
      saveSessionData({ ...action.payload, isAuthenticated: true });
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.userName

      };
    case "LOGOUT": return {
      ...state,
      isAuthenticated: false,
      user: null
    };


    default:
      return state;
  }
};

export default Reducer;