import React, { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();

// User related functions

export const initialState = {
  loading: false,
  errorMessage: null,
};

export const reducer = (initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...initialState,
        user: action.userId,
        loading: false,
        address1: "123 Yemen Road",
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
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
    if (localUser && localUser.length > 0) {
      userDispatch({
        type: "INIT",
        value: JSON.parse(localStorage.getItem("localUser")),
      });
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
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
