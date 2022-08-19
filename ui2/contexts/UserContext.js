import { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();
export const initialState = { user: false };

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.userId,
        address1: "123 Yemen Road",
      };
    case "LOGOUT":
      return {
        ...state,
        user: "",
      };
    case "INIT":
      // console.log("reducer", action.value);
      return action.value;
  }
};

// Handle all user functions in a handy provider. initalized in _app.js
export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("localUser")) || false;
    userDispatch({
      type: "INIT",
      value: localUser,
    });
  }, []);
  useEffect(() => {
    if (user.user) {
      // console.log("storing user", user);
      localStorage.setItem("localUser", JSON.stringify(user));
    } else {
      // console.log("skip!", user);
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useUserContext = () => useContext(UserContext);
