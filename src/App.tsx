import styles from "./App.module.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Componentes/Navbar/Navbar";
import Inicio from "./Componentes/Inicio/Inicio";
import Login from "./Componentes/Login/Login";
import { AuthProvider, useAuth } from "./Componentes/Context/AuthContext";
import Crearcuenta from "./Componentes/Crearcuenta";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          className={`${styles.container} ${
            isAuthenticated ? styles.authenticated : styles.unauthenticated
          }`}
        >
          {isAuthenticated && (
            <div className={styles.navbar}>
              <Navbar />
            </div>
          )}
          <div className={styles.main}>
            <Routes>
              <Route
                path="/"
                element={
                  isAuthenticated ? <Inicio /> : <Navigate to="/login" replace />
                }
              />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? <Login /> : <Navigate to="/" replace />
                }
              />
              <Route path="/crearcuenta" element={<Crearcuenta />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
