import React, {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";

const UserContext = createContext();

// User related functions

export const initialState = false;

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
    const localUser = JSON.parse(localStorage.getItem("localUser")) || false;
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
  // });
  useEffect(() => {
    // if (typeof window !== "undefined") {
    localStorage.setItem("localUser", JSON.stringify(user));
    // }
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

export const useEffectOnce = (effect) => {
  const effectFn = useRef(effect);
  const destroyFn = useRef();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!rendered.current) {
        return;
      }

      // otherwise this is not a dummy destroy, so call the destroy func
      if (destroyFn.current) {
        destroyFn.current();
      }
    };
  }, []);
};
