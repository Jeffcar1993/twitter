
import { Link } from "react-router-dom";
import Boton from "../Boton";
import { useAuth } from "../Context/AuthContext";
import styles from "./Perfil.module.css";
import Editarperfil from "../Editarperfil";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";

interface Post {
  id: string;
  NombreAutor: string;
  username: string;
  imagen: string;
  mensaje: string;
  timestamp: Timestamp; // Firebase.Timestamp
}

const Perfil = () => {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Escuchar en tiempo real los cambios en la colección "posts"
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp instanceof Timestamp
          ? doc.data().timestamp
          : Timestamp.now(),
      } as Post)));
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar el componente
  }, []);

  const handleEditarClick = () => {
    setIsEditing(true);
  };

  const handleCerrarModal = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.otrotitulo}>Bienvenido a tu perfil</h2>
         
         

      <div className={styles.perfil}>

      {userData ? (
        <>
          <div className={styles.imagenBoton}>
            <img className={styles.imagen} src={userData.imagen} alt={userData.imagen} />
            <Boton size="lg" onClick={handleEditarClick}>Editar</Boton>
          </div>

          <br />
          <h1 className={styles.titulo}>{userData?.nombre} {userData?.apellido}</h1>
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

      
      {posts.map((post) => (
          <div className={styles.posts} key={post.id}>
              <img className={styles.imagen2} src={post.imagen} alt={`${post.NombreAutor}'s avatar`} />
            <div className={styles.info}>
              <div className={styles.autor}>
                <h4>{post.NombreAutor}</h4>
                <p className={styles.username}>@{post.username}</p>
                <small className={styles.fecha}>{post.timestamp.toDate().toLocaleString()}</small>
              </div>
              <p className={styles.publicacion}>{post.mensaje}</p>
            </div>
          </div>
        ))}
      
      
    </div>
  );
};

export default Perfil;
