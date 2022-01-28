import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";
// import store from "./store";
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store"; //ES6 modules

const sum = (a, b) => {
  return a + b;
};
// ++++++++++++++++++ ///   mock redux  ///++++++++++++++++++++++++++
// const { configureStore } = require("redux-mock-store"); //CommonJS
const rrd = require("redux-mock-store");
const mockStore = configureStore([]);
const initialState = {};
const store = mockStore(initialState);

test("sum", () => {
  expect(sum(2, 8));
});
// test("header", () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   act(() => {
//     userEvent.click(screen.getByLabelText("menu-btn"));
//   });

//   expect(screen.getByTestId("dropdownMenu")).toBeVisible();
//   // toHaveClass("showTrnsform")();

//   screen.debug();
// });
// ++++++++++++++++++++++++++++++++++++++++++++
