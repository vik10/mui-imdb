import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleAddtoWatchlist } from "../reducer/fetchSlice";

const ProductInfo = () => {
  const dispatch = useDispatch();
  const productId = useParams().id;
  const [productObj, setProductObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [readFull, setReadFull] = useState(false);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?i=${productId}&plot=full&apikey=2e1e970c`)
      .then((promise) => promise.json())
      .then((item) => {
        setLoading(false);
        setProductObj(item);
      });
    fetch(`https://imdb-api.com/en/API/YouTubeTrailer/k_a605w520/${productId}`)
      .then((promise) => promise.json())
      .then((item) => setVideoId(item.videoId));
  }, []);

  if (loading) {
    return <h1 className="text-center mt-4">Loading...</h1>;
  }
  if (!Object.keys(productObj).length) {
    return <h1 className="text-center mt-4">Loading...</h1>;
  }
  return (
    <>
      <div id="prodCont">
        <Container maxWidth="xl" id="" className="bg-dark py-3">
          <Grid
            container
            spacing={{ xs: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={8} color={"white"}>
              <h1 className="fw-bold">{productObj.Title}</h1>
              <div className="d-flex">
                <span>{productObj.Year}</span> . <span>{productObj.Rated}</span>{" "}
                .<span>{productObj.Runtime}</span>
              </div>
            </Grid>
            <Grid item xs={1} sm={4} md={4} sx={{ minWidth: 330 }}>
              <Grid
                container
                color={"white"}
                // justifyContent={"center"}
                columns={{ xs: 3 }}
                className="text-uppercase"
              >
                <Grid item xs={1} className="text-center">
                  <p className="mb-0 ">imdb rating</p>
                  <i className="fa fa-star text-warning fs-4 me-1"></i>
                  {productObj.imdbRating} /10
                </Grid>
                <Grid item xs={1} className="text-center">
                  <p className="mb-0">your rating</p>
                  <i className="fa fa-star-o text-primary fw-bold fs-3"></i>
                </Grid>
                <Grid item xs={1} className="text-center">
                  <p className="mb-0 fw-bold">BoxOffice</p>
                  <span className="text-danger">{productObj.BoxOffice}</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            sx={{ p: 1, my: 3, borderRadius: 1 }}
            color={"white"}
            bgcolor={"#595959"}
          >
            <Grid item xs></Grid>
            <Grid item xs={"auto"}>
              <Link to="" className="fw-bold">
                Cast & Crew
              </Link>
              <span className="mx-2">.</span>
              <span>User Review</span>
              <span className="mx-2">.</span>
              <span>IMbd Pro</span>
              <i className="fa fa-th fw-bold ms-3 fs-3"></i>
            </Grid>
          </Grid>
          <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 12 }}>
            <Grid item xs={1} sm={2} md={3}>
              <img src={productObj.Poster} alt="" className="w-100" />
            </Grid>
            <Grid item xs={3} sm={4} md={6}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                className="w-100 h-100"
              ></iframe>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid
                container
                rowGap={2}
                columnSpacing={2}
                columns={{ xs: 2, sm: 4, md: 4 }}
                height={"100%"}
              >
                <Grid item xs={2} sm={2} md={4}>
                  <Box
                    componet="div"
                    bgcolor={"#595959"}
                    className="d-flex"
                    sx={{
                      height: 1,
                      borderRadius: 1,
                      p: 1,
                      placeItems: "center",
                      placeContent: "center",
                      gap: 1,
                    }}
                  >
                    <i className="fa fa-film"></i>3 Video
                  </Box>
                </Grid>
                <Grid item xs={2} sm={2} md={4}>
                  <Box
                    componet="div"
                    bgcolor={"#595959"}
                    sx={{
                      height: 1,
                      borderRadius: 1,
                      display: "flex",
                      placeItems: "center",
                      placeContent: "center",
                      gap: 1,
                    }}
                  >
                    <i className="fa fa-picture-o"></i>
                    55 Photos
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={8}>
              <Box componet="div" sx={{ mt: 4 }}>
                <span className="badge bg-primary">
                  {productObj.Genre.split(",")[0]}
                </span>
                <span className="badge bg-success mx-2">
                  {productObj.Genre.split(",")[1]}
                </span>
                <span className="badge bg-danger">
                  {productObj.Genre.split(",")[1]}
                </span>
              </Box>
              <Typography variant="body1" color="white" sx={{ my: 4 }}>
                {productObj.Plot.substr(0, 250)}
                {!readFull && "..."}
                {readFull ? (
                  productObj.Plot.substr(250, productObj.Plot.length)
                ) : (
                  <a onClick={() => setReadFull(true)} className="text-primary">
                    Read more
                  </a>
                )}
              </Typography>
              <Divider sx={{ color: "white" }} />
              <Typography variant="body1" color="white" sx={{ my: 2 }}>
                Director :{" "}
                <span className="text-warning fw-bold">
                  {productObj.Director}
                </span>
              </Typography>
              <Divider sx={{ color: "white" }} />
              <Typography variant="body1" color="white" sx={{ my: 2 }}>
                Writer :{" "}
                <span className="text-warning fw-bold">
                  {productObj.Writer}
                </span>
              </Typography>
              <Divider sx={{ color: "white" }} />
              <Typography variant="body1" color="white" sx={{ my: 2 }}>
                Stars :{" "}
                <span className="text-warning fw-bold">
                  {productObj.Actors}
                </span>
              </Typography>
            </Grid>
            <Grid item md sx={{ mt: 3 }}>
              <Box
                component="div"
                sx={{
                  p: 1,
                  pl: 2,
                  bgcolor: "goldenrod",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <i className="fa fa-play"></i> Watch on Netflix
              </Box>
              <Button
                variant="contained"
                onClick={() =>
                  dispatch(handleAddtoWatchlist(productObj.imdbID))
                }
              >
                <i className="fa fa-plus me-2"></i>
                Add to Watchlist
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ProductInfo;
