import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const Poster = () => {
  const state = useSelector((state) => state.rootReducer.fetchSlice);
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ maxWidth: 1200, mt: 0, pt: "3em", mb: "4em", px: 2 }}
        columns={{ xs: 12, md: 16 }}
        className="posterCont"
      >
        <Grid xs item sx={{ minWidth: 400, minHeight: 300 }}>
          <iframe
            className="w-100 h-100"
            src={`https://www.youtube.com/embed/q3F9ASSsHUk`}
          ></iframe>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container rowGap={1}>
            {Array.from({ length: 2 }).map((product, i) => (
              <Grid
                item
                xs={4}
                md={16}
                key={i}
                sx={{
                  bgcolor: "text.primary",
                  color: "background.paper",
                }}
              >
                <CardMedia
                  component="img"
                  className="posterPic"
                  height="290"
                  image={state.productsArr[i].Poster}
                  alt="green iguana"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    sx={{ pb: 0 }}
                  >
                    {state.productsArr[i].Title}
                  </Typography>
                </CardContent>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Poster;
