import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom"
import Boton from "../Boton/Boton"
import { Bell, CircleEllipsis, Factory, House, Import, Mail, Rainbow, Search, Twitter, User, Users } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import Postear from "../Postear";

const Navbar = () => {

  const { userData } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();
  const [postear, setPostear] = useState(false);

  const handlePostearClic = () => {
    setPostear(true);
  }

  const handleCerrarPostear = () => {
    setPostear(false);
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <div className={styles.containernavbar}>
       <Link to="/"> <h1><Twitter className={styles.logo}/></h1> </Link>
        <div className={styles.navbar}>
            <Link className={styles.link} to="/"> <House /> Inicio</Link>
            <Link className={styles.link} to="/explorar"> <Search /> Explorar</Link>
            <Link className={styles.link} to="/notificaciones"> <Bell /> Notificaciones</Link>
            <Link className={styles.link} to="/mensajes"> <Mail /> Mensajes</Link>
            <Link className={styles.link} to="/grok"> <Rainbow /> Grok</Link>
            <Link className={styles.link} to="/guardados"> <Import /> Guardados</Link>
            <Link className={styles.link} to="/comunidades"> <Users /> Comunidades</Link>
            <Link className={styles.link} to="/premium"> <Twitter /> Premium</Link>
            <Link className={styles.link} to="/empresa"> <Factory /> Empresa</Link>
            <Link className={styles.link} to="/perfil"> <User /> Perfil</Link>
            <Link className={styles.link} to="/mas"> <CircleEllipsis /> Mas opciones</Link>
            <Boton size="lg" onClick={handlePostearClic}>Postear</Boton>
            <Boton variant="outline" size="lg" onClick={handleLogout}> Salir</Boton>

            {userData && (

              <div className={styles.imagenBoton}>
                <img className={styles.imagen} src={userData?.imagen} alt={userData?.imagen} />
                <div className={styles.minidata}>
                    <h1 className={styles.titulo}>{userData?.nombre} {userData?.apellido}</h1>
                    <h2 className={styles.subtitulo}> @{userData?.username}</h2>
                </div>
            </div>
            )}

            <Postear isOpen={postear} onClose={handleCerrarPostear} />

        </div>
    </div>
  )
}

export default Navbar