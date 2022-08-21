import { createContext, useReducer, useEffect, useContext } from "react";

const TestContext = createContext();
const initialState = { list: [] };

// Functions
const reducer = (test, action) => {
  const todo = action.todo;
  switch (action.type) {
    case "ADD":
      // if (!test.list) {
      //   test.list = [];
      // }
      const addExist = test.list.find((item) => item === todo);
      if (addExist) {
        test.list.map((x) =>
          x === todo ? { ...addExist, qty: addExist.qty + 1 } : x
        );
      } else {
        console.log("didn't exist");
        // [...test.list, { ...todo, qty: 1 }];
      }
      return test;
    default:
      console.log("nuthin");
  }
};

// Handle all Test functions in a handy provider. initalized in _app.js
export const TestProvider = ({ children }) => {
  const [test, testDispatch] = useReducer(reducer, initialState);

  return (
    // <CartDispatchContext.Provider value={dispatch}>
    <TestContext.Provider value={{ test, testDispatch }}>
      {children}
    </TestContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useTestContext = () => useContext(TestContext);
