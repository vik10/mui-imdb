import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import configureStore from "redux-mock-store";
import store from "./store";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/user-event/dist/utils";
const mockStore = configureStore();
const initialState = {
  rootReducer: {
    fetchSlice: {
      watchListIdArr: [],
      productsArr: [
        { imdbID: 99, Poster: "", Title: "" },
        { imdbID: 199, Poster: "", Title: "" },
      ],
    },
  },
};
const storeFake = mockStore(initialState);

test("all app test", async () => {
  const rrd = require("react-router-dom");
  jest.spyOn(rrd, "BrowserRouter");

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await screen.findAllByAltText(/movie-card-pic/i);

  act(() => {
    userEvent.type(screen.getByRole("textbox", { name: "Search" }), "war");
    userEvent.type(screen.getByRole("textbox", { name: "Search" }), "{enter}");
  });

  //   expect(screen.getByRole("textbox", { name: "Search" })).toHaveValue("war");

  //   await waitFor(() => screen.findByText(/Results for/i));
  //   await screen.findByText(/Results for/i);
  await screen.findByRole();
  screen.debug();
});
