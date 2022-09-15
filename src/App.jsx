import Login from "./page/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./page/home/Home";
import CreateUser from "./page/createUser/CreateUser";
import UpdateUser from "./page/updateUser/UpdateUser";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);

    if (!token) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          {/* <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/home" index element={<Home />} />
          <Route
            path="/create"
            index
            element={
              // <ProtectedRoute>
              //   <CreateUser />
              // </ProtectedRoute>
              <CreateUser />
            }
          />
          <Route
            path="/update"
            index
            element={
              // <ProtectedRoute>
              //   <UpdateUser />
              // </ProtectedRoute>
              <UpdateUser />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
