import {
  CardContent,
  CardMedia,
  Card,
  Grid,
  Icon,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useDispatch, useSelector } from "react-redux";
import { handleAddtoWatchlist } from "../reducer/fetchSlice";
import { isSelected } from "../utils";
import { useNavigate } from "react-router-dom";

const Ccard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.rootReducer.fetchSlice);
  return (
    <>
      <Grid item className="Card col-3">
        <Card sx={{ position: "relative", cursor: "pointer" }}>
          <CardMedia
            component="img"
            onClick={() => navigate(`${props.obj.imdbID}`)}
            sx={{ height: 1 }}
            image={props.obj.Poster}
            alt="movie-card-pic"
            sx={{ height: 220 }}
          />
          <CardContent sx={{ p: 1 }}>
            <Typography variant="body1" color="black" height={"4em"}>
              {props.obj.Title} ({props.obj.Year})
            </Typography>
          </CardContent>
          <Button
            aria-label="add-btn"
            sx={{ position: "absolute", top: 0, pt: 0, ml: "-14px" }}
            onClick={() => {
              dispatch(handleAddtoWatchlist(props.obj.imdbID));
            }}
          >
            {isSelected(state.watchListIdArr, props.obj.imdbID) ? (
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
      </Grid>
    </>
  );
};

export default Ccard;
