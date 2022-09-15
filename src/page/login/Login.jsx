import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios({
        method: "post",
        url: "http://fakestoreapi.com/auth/login",
        data: credentials,
      });
      //  axios.post(
      //   `https://cors-anywhere.herokuapp.com/https://fakestoreapi.com/auth/login`,
      //   credentials
      // );
      if (res.token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.token });
        console.log("sukses");
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <>
      <div className="loginContainer">
        <Container component="main" maxWidth="xs" className="containerLogin">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="imgLogo">
              <img
                src="https://career.amikom.ac.id/images/company/cover/1633942770.png"
                alt="GMF-AEROASIA"
                width="200px"
                height="100px"
                style={{ marginTop: "20px" }}
              />
            </div>
            <Box
              component="form"
              onSubmit={handleClick}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    idnumber: e.target.value,
                  }))
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          {loading && "Loading"}
          {!loading && error ? <h2>Error: {error} </h2> : null}
        </Container>
      </div>
    </>
  );
}
