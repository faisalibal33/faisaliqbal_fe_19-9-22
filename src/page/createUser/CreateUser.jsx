import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import ModalCreate from "../../component/ModalCreate";
import "./createuser.css";

const CreateUser = () => {
  const [modalCreate, setModalCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createUser, setCreateUser] = useState({
    email: undefined,
    address: { city: undefined },
    name: { firstname: undefined, lastname: undefined },
    username: undefined,
    phone: null,
  });
  const navigate = useNavigate();

  const addUser = async () => {
    setModalCreate(false);
    setLoading(true);
    try {
      await axios.post("https://fakestoreapi.com/users", createUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="containerCreate">
      <Loading loading={loading} />
      <h1 style={{ textAlign: "center" }}>Create User</h1>
      <ModalCreate
        modalCreate={modalCreate}
        setModalCreate={setModalCreate}
        addUser={addUser}
      />
      <Box className="createBox">
        <TextField
          label="Email"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <TextField
          label="Address"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />
        <TextField
          label="First Name"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              firstname: e.target.value,
            }))
          }
        />
        <TextField
          label="Last Name"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              lastname: e.target.value,
            }))
          }
        />
        <TextField
          label="username"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        <TextField
          label="phone"
          multiline={true}
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setCreateUser((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
        />
        <div>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{ marginLeft: "9px", marginTop: "10px" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => setModalCreate(true)}
            sx={{ marginLeft: "9px", marginTop: "10px" }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CreateUser;
