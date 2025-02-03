import styles from "./App.module.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Componentes/Navbar/Navbar";
import Inicio from "./Componentes/Inicio/Inicio";
import Login from "./Componentes/Login/Login";
import { AuthProvider, useAuth } from "./Componentes/Context/AuthContext";
import Crearcuenta from "./Componentes/Crearcuenta";
import Perfil from "./Componentes/Perfil/Perfil";
import Sidebar from "./Componentes/Sidebar";
import Explorar from "./Componentes/Explorar";
import Notificaciones from "./Componentes/Notificaciones";
import Mensajes from "./Componentes/Mensajes";
import Grok from "./Componentes/Grok";
import Guardados from "./Componentes/Guardados";
import Comunidades from "./Componentes/Comunidades";
import Premium from "./Componentes/Premuim";


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

              <Route
                path="/perfil"
                element={
                  isAuthenticated ? <Perfil /> : <Navigate to="/" replace />
                } 
              />

              <Route
                path="/explorar"
                element={
                  isAuthenticated ? <Explorar /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/notificaciones"
                element={
                  isAuthenticated ? <Notificaciones /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/mensajes"
                element={
                  isAuthenticated ? <Mensajes /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/grok"
                element={
                  isAuthenticated ? <Grok /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/guardados"
                element={
                  isAuthenticated ? <Guardados /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/comunidades"
                element={
                  isAuthenticated ? <Comunidades /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/premium"
                element={
                  isAuthenticated ? <Premium /> : <Navigate to="/" replace />
                }
              />             

              <Route path="/crearcuenta" element={<Crearcuenta />} />

            </Routes>
          </div>
          {isAuthenticated && (
            <div className={styles.sidebar}>
              <Sidebar />
            </div>
          )}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
