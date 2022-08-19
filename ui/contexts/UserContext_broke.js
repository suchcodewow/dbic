import { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();

// User related functions
// let user = localStorage.getItem("currentUser")
//   ? JSON.parse(localStorage.getItem("currentUser")).user
//   : "";

export const initialState = {};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.userId,
        address1: "123 Yemen Road",
      };
    case "LOGOUT":
      return {
        ...state,
        user: "",
      };
    case "INIT":
      return action.value;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Handle all user functions in a handy provider. initalized in _app.js
export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("localUser"));
    if (Object.keys(localUser).length === 0) {
      console.log("loading user", localUser);
      userDispatch({
        type: "INIT",
        value: localUser,
      });
    } else {
      console.log("UserContext local empty");
    }
  }, []);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    localStorage.setItem("localUser", JSON.stringify(user));
    // }
  }, [user]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state"))) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      userDispatch({
        type: "INIT",
        value: JSON.parse(localStorage.getItem("state")),
      });
    }
  }, []);
  useEffect(() => {
    if (user !== initialState) {
      localStorage.setItem("state", JSON.stringify(user));

      //create and/or set a new localstorage variable called "state"
    }
  }, [user]);
  return (
    // <userDispatchContext.Provider value={dispatch}>
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useUserContext = () => useContext(UserContext);
