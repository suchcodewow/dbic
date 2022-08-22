import { createContext, useReducer, useEffect, useContext } from "react";
import { GenerateAddress } from "components";
import { GenerateDynacard } from "components";
const UserContext = createContext();
export const initialState = { prerender: true };

//The reducer function makes it easier to add many commands without more imports
export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.userId,
        defaultAddress: GenerateAddress(),
      };
    case "Dynacard":
      return {
        ...state,
        Dynacard: GenerateDynacard(action.value),
      };
    case "CART_ADDRESS":
      return {
        ...state,
        cartAddress: action.value,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        user: "",
      };
    case "INIT":
      // console.log("reducer init:", action.value);
      return action.value;
    default:
      console.log("NO USER ACTION");
      return state;
  }
};

// Handle all user functions in a handy provider. initalized in _app.js
export const UserProvider = ({ children }) => {
  //Setup functions with a reducer
  const [user, userDispatch] = useReducer(reducer, initialState);
  //Load user details from storage if found
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("localUser")) || false;
    userDispatch({
      type: "INIT",
      value: localUser,
    });
  }, []);
  //When the user details change on the site, save to localstorage
  useEffect(() => {
    if (user.user) {
      // console.log("storing user", user);
      localStorage.setItem("localUser", JSON.stringify(user));
    } else {
      // console.log("skip!", user);
    }
  }, [user]);
  //Return a provider to wrap in _app.js
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useUserContext = () => useContext(UserContext);
