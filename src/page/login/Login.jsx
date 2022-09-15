import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./login.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../component/Loading";
import ModalError from "../../component/ModalError";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [modalError, setModalError] = useState(false);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      // const res = await fetch("https://fakestoreapi.com/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     username: "mor_2314",
      //     password: "83r5^_",
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((json) => console.log(json));
      // const res = await axios({
      //   method: "post",
      //   url: "http://fakestoreapi.com/auth/login",
      //   data: credentials,
      // });

      const res = await axios.post(
        `https://fakestoreapi.com/auth/login`,
        credentials
      );
      if (res.token) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.token });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Wrong username and password!" },
        });
        setModalError(true);
      }
    } catch (err) {
      setModalError(true);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <>
      <Loading loading={loading} />
      <ModalError modalError={modalError} setModalError={setModalError} />

      <div
        className="loginContainer"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ width: "500px", paddingBottom: "40px" }}>
          <p>
            <span>Note:</span> Mohon maaf pak karna ada blocked cors di
            server-side apinya, sudah mencoba beberapa cara untuk lewatin cors
            nya tapi saya belum ketemu caranya. Untuk lanjut kehalaman
            berikutnya bisa klik tombol{" "}
            <Link to="/home">
              <Button variant={"contained"} color={"success"}>
                ini
              </Button>
            </Link>
          </p>
        </div>
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
            <form style={{ marginTop: "40px" }} onSubmit={handleClick}>
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
            </form>
          </Box>
          {loading && "Loading"}
          {!loading && error ? <h2>Error: {error} </h2> : null}
        </Container>
      </div>
    </>
  );
}
