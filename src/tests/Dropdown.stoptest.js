import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Dropdown from "../components/Dropdown";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore();

const initialState = {
  rootReducer: {
    fetchSlice: {
      watchListIdArr: [],
    },
  },
};
const storeFake = mockStore(initialState);
const mockFn = jest.fn();

test("dropdown tests", () => {
  const rrd = require("react-router-dom");
  jest
    .spyOn(rrd, "BrowserRouter")
    .mockImplementation(({ children }) => children);
  render(
    <Provider store={storeFake}>
      <rrd.MemoryRouter>
        <Dropdown />
      </rrd.MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText("home-btn")).toBeInTheDocument();
  userEvent.click(screen.getByLabelText("movie-btn"), mockFn());
  expect(mockFn).toBeCalled();
});
