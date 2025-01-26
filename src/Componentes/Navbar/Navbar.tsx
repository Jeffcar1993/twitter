import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom"
import Boton from "../Boton/Boton"
import { Bell, CircleEllipsis, Factory, House, Import, Mail, Rainbow, Search, Twitter, User, Users } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {

  const navigate = useNavigate();
  const auth = getAuth();

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
        <h1><Twitter className={styles.logo}/></h1>
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
            <Boton size="lg">Postear</Boton>
            <Boton variant="outline" size="lg" onClick={handleLogout}>Salir</Boton>
        </div>
    </div>
  )
}

export default Navbar