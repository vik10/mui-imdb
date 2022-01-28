import "./main.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchCardContainer from "./components/SearchCardContainer";
import { useSelector } from "react-redux";
import ProductInfo from "./components/ProductInfo";
import Dropdown from "./components/Dropdown";
import WatchList from "./components/WatchList";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const state = useSelector((state) => state.rootReducer.fetchSlice);

  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route
            path={`/search/:${state.searchText}`}
            element={<SearchCardContainer />}
          />
          <Route
            path={`/search/:${state.searchText}/:id`}
            element={<ProductInfo />}
          />
          <Route path={`/:id`} element={<ProductInfo />} />
          <Route path={`/watchlist/:id`} element={<ProductInfo />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
        <Dropdown />
      </BrowserRouter>
      {/* </Provider> */}
    </div>
  );
}

export default App;
