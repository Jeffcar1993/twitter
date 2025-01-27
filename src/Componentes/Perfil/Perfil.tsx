
import { Link } from "react-router-dom";
import Boton from "../Boton";
import { useAuth } from "../Context/AuthContext";
import styles from "./Perfil.module.css";

const Perfil = () => {
  const { userData } = useAuth();

  return (
    <div className={styles.container}>

      <h1 className={styles.titulo}>Bienvenido {userData?.nombre} {userData?.apellido}</h1>

      <div className={styles.perfil}>

      {userData ? (
        <>
          <div className={styles.imagenBoton}>
            <p>Aca debe estar tu imagen</p>
            <Boton size="lg">Editar</Boton>
          </div>
          <br />
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Teléfono: {userData.telefono}</p>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      </div>

      <div className={styles.links}>

        <Link to="/publicaciones">Publicaciones</Link>
        <Link to="/respuestas">Respuestas</Link>
        <Link to="/articulos">Articulos</Link>

      </div>
    
    </div>
  );
};

export default Perfil;
