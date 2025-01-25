import styles from "./Navbar.module.css";
import { Link } from "react-router-dom"
import Boton from "../Boton/Boton"
import { Bell, CircleEllipsis, Factory, House, Import, Mail, Rainbow, Search, Twitter, User, Users } from "lucide-react";
import { signOut } from "firebase/auth";

const Navbar = () => {
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
            <Boton variant="outline" size="lg" onClick={() => signOut}>Salir</Boton>
        </div>
    </div>
  )
}

export default Navbar