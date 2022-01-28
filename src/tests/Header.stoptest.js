import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Header from "../components/Header";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
const mockStore = configureStore();

const initialState = {
  rootReducer: {
    fetchSlice: {
      watchListIdArr: [],
    },
  },
};
const storeFake = mockStore(initialState);

test("header test", () => {
  const rrd = require("react-router-dom");
  //   jest.spyOn(rrd, "BrowserRouter");

  render(
    <Provider store={storeFake}>
      <rrd.MemoryRouter>
        <Header />
      </rrd.MemoryRouter>
    </Provider>
  );
  userEvent.click(screen.getByLabelText("menu-btn"), mockFn());
  expect(mockFn).toBeCalled();

  userEvent.click(screen.getByRole("link", { name: "IMDb" }), mockFn());
  expect(mockFn).toBeCalled();

  expect(screen.getByLabelText("select-btn-header")).toHaveTextContent("Title");

  userEvent.click(screen.getByLabelText("select-btn-header"));
  userEvent.selectOptions(
    screen.getByRole("listbox"),
    screen.getByRole("option", { name: "Twenty" })
  );
  //   userEvent.click(screen.getByRole("option", { name: "Ten" }));
  expect(screen.getByLabelText("select-btn-header")).toHaveTextContent(
    "Twenty"
  );

  userEvent.type(screen.getByRole("textbox", { name: "Search" }), "war");
  expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("war");

  userEvent.click(screen.getByRole("button", { name: "Sign in" }), mockFn());
  expect(mockFn).toBeCalled();

  userEvent.click(screen.getByRole("button", { name: "Watchlist" }), mockFn());
  expect(mockFn).toBeCalled();
});
