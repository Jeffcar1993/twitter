
import { Link } from "react-router-dom";
import Boton from "../Boton";
import { useAuth } from "../Context/AuthContext";
import styles from "./Perfil.module.css";
import Editarperfil from "../Editarperfil";
import { useState } from "react";
import { MapPin } from "lucide-react";

const Perfil = () => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditarClick = () => {
    setIsEditing(true);
  };

  const handleCerrarModal = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.otrotitulo}>Bienvenido a tu perfil</h2>
         
         <h1 className={styles.titulo}>{userData?.nombre} {userData?.apellido}</h1>

      <div className={styles.perfil}>

      {userData ? (
        <>
          <div className={styles.imagenBoton}>
            <img className={styles.imagen} src={userData.imagen} alt={userData.imagen} />
            <Boton size="lg" onClick={handleEditarClick}>Editar</Boton>
          </div>

          <br />

            <h2 className={styles.subtitulo}> @{userData.username}</h2>

          <div className={styles.datos}>
            <p className={styles.parrafo} > {userData.descripcion}</p> <br />
            <p className={styles.parrafo} > {userData.email}</p>
            <p className={styles.parrafo} > {userData.telefono}</p> <br />
            <p className={styles.parrafo} ><MapPin className={styles.mapin} /> {userData.ubicacion}</p>
          </div>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      </div>

      <div className={styles.links}>

        <Link className={styles.enlace} to="/publicaciones">Publicaciones</Link>
        <Link className={styles.enlace} to="/respuestas">Respuestas</Link>
        <Link className={styles.enlace} to="/articulos">Articulos</Link>
        <Link className={styles.enlace} to="/multimedia">Multimedia</Link>

      </div>
      <Editarperfil isOpen={isEditing} onClose={handleCerrarModal} />
    </div>
  );
};

export default Perfil;
