import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { handleAddtoWatchlist, handleSearchFetch } from "../reducer/fetchSlice";
import {
  Button,
  Card,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { isSelected } from "../utils";
import { ArrowDownward, ArrowUpward, ViewComfy } from "@material-ui/icons";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const SearchCardContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortFilterVal, setSortFilterVal] = useState("");
  const state = useSelector((state) => state.rootReducer.fetchSlice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.omdbapi.com/?s=${state.searchText}&plot=full&apikey=2e1e970c&page=2`
    )
      .then((promise) => promise.json())
      .then((item) => {
        setLoading(false);
        dispatch(handleSearchFetch(item.Search));
      });
  }, [state.searchText]);

  const filterArr = state.searchProductArr.filter((item) =>
    item.Type.includes(state.categryVal)
  );

  if (loading) {
    return <h1 className="text-center mt-4">Loading...</h1>;
  }
  console.log(filterArr);
  return (
    <>
      <Box
        component={"div"}
        className="bg-light"
        sx={{
          maxWidth: "90%",
          mx: "auto",
          mt: 4,
          py: 2,
          borderRadius: 1,
          border: 1,
        }}
      >
        <div className="px-3">
          <h3>
            Results for <span className="text-info">"{state.searchText}"</span>
          </h3>
          <Divider />
          <Grid container spacing={3} alignItems={"center"}>
            <Grid item xs>
              <Typography variant="p">{} Titles</Typography>
            </Grid>
            <Grid item xs="auto">
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Sort By:
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={sortFilterVal}
                  autoWidth
                  sx={{ minWidth: 120 }}
                  label="Age"
                  onChange={(e) => setSortFilterVal(e.target.value)}
                >
                  <MenuItem value="Popularty">Popularty</MenuItem>
                  <MenuItem value="Number of Rating">Number of Rating</MenuItem>
                  <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                  <MenuItem value="Imdb Rating">Imdb Rating</MenuItem>
                  <MenuItem value="Release Date">Release Date</MenuItem>
                  <MenuItem value="Run Time">Run Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs="auto">
              <ArrowDownward style={{ marginRight: "-8px" }} />
              <ArrowUpward />
            </Grid>
            <Grid item xs="auto" justifyContent={"center"}>
              <ViewComfy fontSize="large" />
            </Grid>
          </Grid>
          <Divider />
        </div>
        {filterArr.map((obj) => (
          <Card key={obj.imdbID} sx={{ position: "relative", mt: 3 }}>
            <Grid
              container
              spacing={0}
              key={obj.imdbID}
              sx={{ bgcolor: "#9494b8" }}
            >
              <Grid item xs={2}>
                <img
                  src={obj.Poster}
                  alt="..."
                  className="w-100"
                  style={{ height: 120, cursor: "pointer" }}
                  onClick={() => navigate(`${obj.imdbID}`)}
                />
              </Grid>
              <Grid item xs color={"white"} sx={{ pl: 2, pt: 2 }}>
                <Box component="h5">
                  {obj.Title} ({obj.Year})
                </Box>
                <Box
                  component="p"
                  className="text-capitalize text-dark fw-bold"
                >
                  {obj.Type}
                </Box>
              </Grid>
            </Grid>
            <Button
              sx={{
                position: "absolute",
                top: 0,
                p: 0,
                ml: "-14px",
              }}
              onClick={() => {
                dispatch(handleAddtoWatchlist(obj.imdbID));
              }}
            >
              {isSelected(state.watchListIdArr, obj.imdbID) ? (
                <BookmarkAddedIcon
                  fontSize="large"
                  sx={{
                    color: "green",
                    bgcolor: "white",
                  }}
                />
              ) : (
                <BookmarkAddIcon
                  sx={{ bgcolor: "purple", color: "white" }}
                  fontSize="large"
                />
              )}
            </Button>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default SearchCardContainer;
