import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./Componentes/Navbar/Navbar"
import Inicio from "./Componentes/Inicio/Inicio"
import Login from "./Componentes/Login/Login";

const App = () => {
  return (
    <BrowserRouter>

      <div className={styles.container}>
        
        <div className={styles.navbar}>
          <Navbar />
        </div>
        
        <div className={styles.main}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>

      </div>

    </BrowserRouter>
  )
}

export default App