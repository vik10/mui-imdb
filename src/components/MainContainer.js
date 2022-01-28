import { Input, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleFetch } from "../reducer/fetchSlice";
import Ccard from "./Ccard";
import Poster from "./Poster";

const MainContainer = () => {
  const state = useSelector((state) => state.rootReducer.fetchSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?s=war&plot=full&apikey=2e1e970c&page=3`)
      .then((promise) => promise.json())
      .then((item) => dispatch(handleFetch(item.Search)));
  }, []);

  if (!state.productsArr.length) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="bg-dark styleBox pb-5">
        <Poster />
        <div className="cardContHome">
          <Grid
            container
            wrap="nowrap"
            spacing={2}
            sx={{ maxWidth: "90%", mx: "auto", overflowX: "scroll" }}
          >
            {state.productsArr.map((obj) => (
              <Ccard obj={obj} key={obj.imdbID} />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default MainContainer;
