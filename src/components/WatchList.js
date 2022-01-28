import {
  ArrowDownward,
  ArrowUpward,
  ArrowUpwardOutlined,
  Star,
  ViewComfy,
} from "@material-ui/icons";
import {
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleAddtoWatchlist,
  handleSortFilter,
  handlewWatchListFetch,
} from "../reducer/fetchSlice";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { isSelected, sorting } from "../utils";
import { Box } from "@mui/system";

const WatchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortFilterVal, setSortFilterVal] = useState("");

  const state = useSelector((state) => state.rootReducer.fetchSlice);

  useEffect(() => {
    state.watchListIdArr.forEach((item) =>
      fetch(`https://www.omdbapi.com/?i=${item}&plot=full&apikey=2e1e970c`)
        .then((promise) => promise.json())
        .then((item) => {
          dispatch(handlewWatchListFetch(item));
        })
    );
  }, []);

  const sorttedArr = sorting(
    state.watchlistProdArr.slice(),
    state.sortFilterVal
  );
  // console.log(sorttedArr);
  return (
    <>
      <Container id="watchlistCont" sx={{ bgcolor: "#f2f2f2", py: 2 }}>
        <Typography variant="h5" className="fw-bold text-uppercase text-dark">
          your favorite watchlist
        </Typography>
        <p>{state.watchlistProdArr.length} Items</p>
        <Divider />
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs>
            <Typography variant="p">{} Titles</Typography>
          </Grid>
          <Grid item xs="auto">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Sort
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={sortFilterVal}
                autoWidth
                sx={{ minWidth: 120 }}
                label="Age"
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(handleSortFilter(e.target.value));
                  setSortFilterVal(e.target.value);
                }}
              >
                <MenuItem value="imdbID">Popularty</MenuItem>
                <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                <MenuItem value="imdbRating">Imdb Rating</MenuItem>
                <MenuItem value="imdbVotes">Number of Rating</MenuItem>
                <MenuItem value="Released">Release Date</MenuItem>
                <MenuItem value="Runtime">Run Time</MenuItem>
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
        {sorttedArr.map((product) => (
          <Card
            onClick={() => navigate(`${product.imdbID}`)}
            sx={{ cursor: "pointer", mb: 2, position: "relative" }}
          >
            <Paper
              component={"div"}
              key={product.imdbID}
              elevation={3}
              sx={{ bgcolor: "#f0f0f5" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <img src={product.Poster} alt="" className="w-100" />
                </Grid>
                <Grid item xs>
                  <Box>
                    <Typography variant="h6" color="initial" sx={{ mt: 1 }}>
                      {product.Title} ({product.Year})
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <Typography
                          variant="body1"
                          color="initial"
                          sx={{ color: "orange" }}
                        >
                          <Star color=""></Star> {product.imdbRating}
                        </Typography>
                        <Typography variant="body2" color="initial">
                          {product.imdbVotes}
                        </Typography>
                        <Typography variant="body1" color="initial">
                          {Math.floor(product.Runtime.split(" ")[0] / 60) +
                            "h " +
                            Math.floor(product.Runtime.split(" ")[0] % 60) +
                            "m"}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <Box>
                          <Typography variant="subtitle1" color="initial">
                            {product.Released}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            <Button
              sx={{ position: "absolute", top: 0, pt: 0, ml: "-14px" }}
              onClick={() => {
                dispatch(handleAddtoWatchlist(product.imdbID));
              }}
            >
              {isSelected(state.watchListIdArr, product.imdbID) ? (
                <BookmarkAddedIcon
                  fontSize="large"
                  color="success"
                  sx={{
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
      </Container>
    </>
  );
};

export default WatchList;
