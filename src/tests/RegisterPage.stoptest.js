import RegisterPage from "../components/RegisterPage";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
const mockFn = jest.fn();
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

test("register from test", () => {
  render(
    <Provider store={storeFake}>
      <RegisterPage setRegisterPageShow={mockFn} />
    </Provider>
  );

  expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();

  userEvent.click(screen.getByTestId("CancelIcon"), mockFn());
  expect(mockFn).toBeCalled();

  userEvent.type(screen.getByLabelText("User Name"), "kill");
  userEvent.type(screen.getByLabelText("Password"), "doit");
  userEvent.type(screen.getByLabelText("Name"), "john");
  userEvent.type(screen.getByLabelText("Age"), "22");

  expect(screen.getByLabelText("User Name")).toHaveValue("kill");
  expect(screen.getByLabelText("Password")).toHaveValue("doit");

  userEvent.click(screen.getByRole("button", { name: "Register" }), mockFn());
  expect(mockFn).toBeCalled();

  userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: "LOGIN" })).toBeInTheDocument();

  //   screen.debug();
});
