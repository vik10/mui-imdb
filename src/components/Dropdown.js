import { Box, Button, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleCategry } from "../reducer/fetchSlice";
import { useState } from "react";

const Dropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.rootReducer.fetchSlice);
  const [selectedCatgry, setSelectedCatgry] = useState({
    name: "",
    selected: false,
  });

  return (
    <>
      <Box
        component="div"
        id="dropdownMenu"
        data-testid="dropdownMenu"
        position={"absolute"}
        className={`text-uppercase ${state.dropdownStatus && "showTrnsform"}`}
        sx={{
          width: 85,
          p: 1,
          pt: 3,
          bgcolor: "text.primary",
          top: 62,
          borderTopRightRadius: "3em",
          borderEndEndRadius: "3em",
        }}
      >
        <Link
          to="/"
          onClick={() => setSelectedCatgry({ name: "home", selected: true })}
        >
          <Button
            aria-label="home-btn"
            sx={{
              color: `${
                selectedCatgry.selected && selectedCatgry.name === "home"
                  ? "gold"
                  : "white"
              } `,
              display: "block",
            }}
          >
            <i className="fa fa-home fs-3"></i>
            <p className="pe-1 mb-1">home</p>
          </Button>
        </Link>
        <Divider />
        <Button
          sx={{
            color: `${
              selectedCatgry.selected && selectedCatgry.name === "all"
                ? "gold"
                : "white"
            } `,
            display: "block",
          }}
          onClick={() => {
            setSelectedCatgry({ name: "all", selected: true });
            dispatch(handleCategry(""));
          }}
        >
          <i className="fa fa-heart fs-3"></i>
          <p className="pe-1 mb-1">All</p>
        </Button>
        <Button
          aria-label="movie-btn"
          sx={{
            color: `${
              selectedCatgry.selected && selectedCatgry.name === "movie"
                ? "gold"
                : "white"
            } `,
            display: "block",
          }}
          onClick={() => {
            setSelectedCatgry({ name: "movie", selected: true });
            dispatch(handleCategry("movie"));
          }}
        >
          <i className="fa fa-film fs-3"></i>
          <p className="pe-1 mb-1">movies</p>
        </Button>
        <Divider />
        <Button
          sx={{
            color: `${
              selectedCatgry.selected && selectedCatgry.name === "tv"
                ? "gold"
                : "white"
            } `,
            display: "block",
          }}
          onClick={() => {
            setSelectedCatgry({ name: "tv", selected: true });
            dispatch(handleCategry("series"));
          }}
        >
          <i className="fa fa-television fs-3"></i>
          <p className="pe-1 mb-1">tv show</p>
        </Button>
        <Divider />
        <Button
          sx={{
            color: `${
              selectedCatgry.selected && selectedCatgry.name === "game"
                ? "gold"
                : "white"
            } `,
            display: "block",
          }}
          onClick={() => {
            setSelectedCatgry({ name: "game", selected: true });
            dispatch(handleCategry("game"));
          }}
        >
          <i className="fa fa-gamepad fs-3"></i>
          <p className="pe-1 mb-1">Game</p>
        </Button>
      </Box>
    </>
  );
};

export default Dropdown;
