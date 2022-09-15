import Login from "./page/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./page/home/Home";

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
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
