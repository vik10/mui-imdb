import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store"; //ES6 modules
import Ccard from "../components/Ccard";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { handleAddtoWatchlist } from "../reducer/fetchSlice";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  rootReducer: {
    fetchSlice: {
      watchListIdArr: [555, "tt0046536"],
    },
  },
};
const storeFake = mockStore(initialState);
const mockFn = jest.fn();

test("card test", () => {
  const rrd = require("react-router-dom");
  jest
    .spyOn(rrd, "BrowserRouter")
    .mockImplementation(({ children }) => children);
  render(
    <Provider store={storeFake}>
      <rrd.MemoryRouter>
        <Ccard obj={{ Title: "john", imdbID: "tt0046536" }} />
      </rrd.MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/john/)).toBeInTheDocument();
  userEvent.click(
    screen.getByLabelText("add-btn"),
    storeFake.dispatch(handleAddtoWatchlist("tt0046536"))
  );
  expect(screen.getByTestId(/BookmarkAddedIcon/)).toBeInTheDocument();
  userEvent.click(screen.getByAltText("movie-card-pic"), mockFn());
  expect(mockFn).toBeCalledTimes(1);

  screen.debug();
});
