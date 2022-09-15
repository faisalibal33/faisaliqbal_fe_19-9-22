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
import { Button } from "@mui/material";
import "./home.css";
import Loading from "../../component/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        setUser(res.data);
      } catch (error) {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="conatainer">
      <Loading loading={loading} />
      <h1 className="titleHome">Data User</h1>
      <div className="tablecontainer">
        <Link to="/create">
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Create User
          </Button>
        </Link>
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
                            sx={{
                              marginRight: "10px",
                              marginBottom: "2px",
                              marginTop: "2px",
                            }}
                          >
                            Delete
                          </Button>
                          <Link to="/update" state={item}>
                            <Button variant="contained">Update</Button>
                          </Link>
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
