import {
  Box,
  Button,
  FilledInput,
  Icon,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl, FormLabel, FormHelperText } from "@mui/material";
import { useState } from "react";
import { grid } from "@mui/system";
import { useDispatch } from "react-redux";
import { handleDropdownShow, handleSearchBar } from "../reducer/fetchSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "./RegisterPage";

const Header = () => {
  const [titleVal, setTitleVal] = useState("");
  const [registerPageShow, setRegisterPageShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.rootReducer.fetchSlice);

  return (
    <>
      <Grid
        container
        spacing={2}
        className="header"
        alignItems="center"
        sx={{
          bgcolor: "text.primary",
          color: "background.paper",
          mt: "-10px",
          px: 2,
        }}
      >
        <Grid item xs="auto">
          <Button
            aria-label="menu-btn"
            sx={{ color: "white", fontSize: "1.5em" }}
            onClick={() => dispatch(handleDropdownShow())}
          >
            <i className="fa fa-bars"></i>
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component={"h3"}
              sx={{
                bgcolor: "goldenrod",
                px: 1,
                color: "black",
                fontWeight: "bold",
                borderRadius: 1,
              }}
            >
              IMDb
            </Box>
          </Link>
        </Grid>
        <Grid item xs className="d-flex" sx={{ maxWidth: 500, mx: "auto" }}>
          <FormControl sx={{ m: 1, mr: 0, minWidth: 110 }}>
            <Select
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              displayEmpty
              sx={{
                height: 40,
                borderTopRightRadius: 0,
                borderEndEndRadius: 0,
                color: "white",
              }}
              inputProps={{ "aria-label": "select-btn-header" }}
            >
              <MenuItem value="">Title</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, ml: 0 }}>
            <InputLabel
              htmlFor="outlined-adornment-amount"
              color="info"
              sx={{ top: -6 }}
            >
              Search
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              onChange={(e) => {
                dispatch(handleSearchBar(e.target.value));
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`search/${state.searchText}`);
                }
              }}
              sx={{
                height: 40,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              endAdornment={
                <InputAdornment position="start" className="text-light">
                  <i className="fa fa-search"></i>
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item xs="auto">
          <Button sx={{ color: "white" }} onClick={() => navigate("watchlist")}>
            <i className="fa fa-plus mt-1 me-1"></i>
            <span>Watchlist</span>
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            color="warning"
            onClick={() => setRegisterPageShow(!registerPageShow)}
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
      {registerPageShow && (
        <RegisterPage setRegisterPageShow={setRegisterPageShow} />
      )}
    </>
  );
};

export default Header;
