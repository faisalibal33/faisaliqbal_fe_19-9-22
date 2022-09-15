import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import ModalUpdate from "../../component/ModalUpdate";

const UpdateUser = () => {
  const location = useLocation();
  const user = location.state;
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    email: user.email,
    address: { city: user.address.city },
    name: { firstname: user.firstname, lastname: user.lastname },
    username: user.username,
    phone: user.phone,
  });
  const navigate = useNavigate();

  const upUser = async () => {
    setModalUpdate(false);
    setLoading(true);
    try {
      await axios.put(`https://fakestoreapi.com/users/${user.id}`, updateUser);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="containerCreate">
      <Loading loading={loading} />
      <h1 style={{ textAlign: "center" }}>Update User</h1>
      <ModalUpdate
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        upUser={upUser}
      />
      <Box className="createBox">
        <TextField
          defaultValue={user.email}
          label="Email"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={user.address.city}
          label="Address"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
              ...prev,
              address: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={user.name.firstname}
          label="First Name"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
              ...prev,
              firstname: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={user.name.lastname}
          label="Last Name"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
              ...prev,
              lastname: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={user.username}
          label="username"
          size="small"
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
        />
        <TextField
          defaultValue={user.phone}
          label="phone"
          multiline={true}
          sx={{
            m: 1,
            width: "97%",
            boxShadow: 2,
          }}
          onChange={(e) =>
            setUpdateUser((prev) => ({
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
            onClick={() => setModalUpdate(true)}
            sx={{ marginLeft: "9px", marginTop: "10px" }}
          >
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UpdateUser;
