import React, { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();

// User related functions

export const initialState = {
  userDetails: "",
  token: "",
  loading: false,
  errorMessage: null,
};

export const reducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      console.log(action);
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Handle all user functions in a handy provider. initalized in _app.js
export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    let localUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")).user
      : "";

    let localToken = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser")).auth_token
      : "";
    // might need this when things get overwritten thanks to NeXt.Js
    // const localuser = JSON.parse(localStorage.getItem("user"));
    // if (localuser && localuser.length > 0) {
    //   userDispatch({
    //     type: "INIT",
    //     value: JSON.parse(localStorage.getItem("user")),
    //   });
    // }
  }, []);
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       localStorage.setItem("user", JSON.stringify(user));
  //     }
  //   }, [user]);
  return (
    // <userDispatchContext.Provider value={dispatch}>
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useUserContext = () => useContext(UserContext);
