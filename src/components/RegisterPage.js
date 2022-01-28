import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { handleUserDetail } from "../reducer/fetchSlice";

const RegisterPage = (props) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [userDetail, setUserDetail] = useState({
    userName: "",
    password: "",
    name: "",
    age: "",
  });
  const [userLogin, setUserLogin] = useState(true);

  // console.log(userDetail);
  return (
    <>
      <Grid
        container
        id="registerPage"
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          transition: "1s",
          zIndex: 5,
          // opacity: 0,
          bgcolor: "rgba(0,0,0,.8)",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Paper component={"div"} sx={{ pt: 1, pb: 3, px: 2, maxWidth: 600 }}>
          <Typography variant="p" color="initial">
            If you are not registred{" "}
            <Button onClick={() => setUserLogin(true)}>Register here</Button>/
            <Button onClick={() => setUserLogin(false)}>Login</Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ position: "relative", left: 100 }}
              onClick={() => props.setRegisterPageShow()}
            >
              <CancelIcon />
            </Button>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Paper component={"div"} sx={{}}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-username">
                    User Name
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-username"
                    type={showUsername ? "text" : "password"}
                    value={userDetail.userName}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, userName: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowUsername(!showUsername)}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showUsername ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper component={"div"} sx={{}}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    role={"form"}
                    data-testid="passwordBox"
                    type={showPassword ? "text" : "password"}
                    value={userDetail.password}
                    onChange={(e) =>
                      setUserDetail({ ...userDetail, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          // onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              {userLogin && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-name">
                          Name
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-name"
                          type="text"
                          value={userDetail.name}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              name: e.target.value,
                            })
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <PersonIcon />
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper>
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-age">
                          Age
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-age"
                          type="number"
                          value={userDetail.age}
                          onChange={(e) =>
                            setUserDetail({
                              ...userDetail,
                              age: e.target.value,
                            })
                          }
                          endAdornment={
                            <InputAdornment position="end">
                              <PersonIcon />
                            </InputAdornment>
                          }
                          label="Password"
                        />
                      </FormControl>
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <div className="text-center mt-4">
            {userLogin ? (
              <Button
                variant="contained"
                onClick={() => dispatch(handleUserDetail(userDetail))}
              >
                Register
              </Button>
            ) : (
              <Button variant="contained" color="error">
                LOGIN
              </Button>
            )}
          </div>
        </Paper>
      </Grid>
    </>
  );
};

export default RegisterPage;
