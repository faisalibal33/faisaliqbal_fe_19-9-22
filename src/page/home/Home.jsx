import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./home.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "white",
};

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function Home() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setLoading(false);
    };
    getUsers();
  }, []);

  const Delete = (id) => {
    fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
    setUser(user.filter((user) => user.id !== id));
  };

  // const UPDATE = (e, editedProduct) => {
  //   e.preventDefault();
  //   const newProductList = products.map((product) =>
  //     product.id === editedProduct.id ? editedProduct : product
  //   );
  //   setProducts(newProductList);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDetail = async (id) => {
    console.log(id);
  };

  return (
    <div className="conatainer">
      <div className="tablecontainer">
        <Button
          variant="contained"
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Create User
        </Button>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer
            sx={{
              maxHeight: "75vh",
              width: "83vw",
              overflow: "scroll",
            }}
          >
            <Table stickyHeader aria-label="sticky table" id="table-to-xls">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    First Name
                  </TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    Last Name
                  </TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    User Name
                  </TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ minWidth: "80px", maxWidth: "90px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell>Loading</TableCell>
                  </TableRow>
                ) : (
                  user
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.address.city}</TableCell>
                        <TableCell>{item.name.firstname}</TableCell>
                        <TableCell>{item.name.lastname}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => Delete(item.id)}
                            variant="contained"
                            color="success"
                            sx={{ marginRight: "10px" }}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() => Delete(item.id)}
                            variant="contained"
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 100]}
            component="div"
            count={user?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
