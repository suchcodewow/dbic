import { createContext, useReducer, useEffect, useContext } from "react";

const TestContext = createContext();
const initialState = { address: "hi nerds", list: [] };

// Functions
const reducer = (test, action) => {
  const todo = action.todo;
  switch (action.type) {
    case "ADD":
      // if (!test.list) {
      //   test.list = [];
      // }
      var addExist = test.list.find((item) => item.itemid === todo.itemid);
      if (addExist) {
        console.log("oh hi der!", addExist);
        return {...test, test.list.map((x) =>
          x.itemid === todo.itemid ? { ...addExist, qty: addExist.qty + 1 } : x
        )}
      } else {
        console.log("didn't exist", addExist);
        // return { ...test, list: [...test.list, { todo, qty: 1 }] };
        return { ...test, list: [...test.list, { ...todo, qty: 1 }] };
      }
    // return test;
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
