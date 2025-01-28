import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useAuth } from "../Context/AuthContext";
import styles from "./Inicio.module.css";
import { Link } from "react-router-dom";
import Boton from "../Boton/Boton";

interface Post {
  id: string;
  NombreAutor: string;
  username: string;
  imagen: string;
  mensaje: string;
  timestamp: Timestamp; // Firebase.Timestamp
}

const Inicio = () => {
  const { userData } = useAuth();
  const [mensaje, setMensaje] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]); // Aquí se asigna el tipo Post[]

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => {
        const data = doc.data();
        
        // Asegúrate de que todos los campos estén presentes
        return {
          id: doc.id,
          NombreAutor: data.NombreAutor || "anonimo",  // Si no existe, se pone un valor por defecto
          username: data.username || "anonimo",        // Lo mismo para los demás campos
          imagen: data.imagen || "",
          mensaje: data.mensaje || "no menssage",
          timestamp: data.timestamp instanceof Timestamp 
            ? data.timestamp 
            : Timestamp.now(),
        };
      }));
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  const handlePost = async () => {
    if (mensaje.trim() === "") {
      alert("Escribe algo antes de postear.");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        NombreAutor: userData?.nombre,
        username: userData?.username,
        imagen: userData?.imagen,
        mensaje,
        timestamp: Timestamp.now(),
      });
      setMensaje("");
      console.log("Post creado correctamente");
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  };

  return (
    <div className={styles.containerinicio}>

      <div className={styles.contenedor}>
        <Link className={styles.link} to="#">Para ti</Link>
        <Link className={styles.link} to="#">Siguiendo</Link>
      </div>

      <div className={styles.input}>
        <textarea
          placeholder="¿Qué está pasando?"
          rows={3}
          className={styles.area}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea> 
        
        <div className={styles.boton}>
          <Boton size="lg" onClick={handlePost}>Postear</Boton>
        </div>
      </div>

      
        {posts.map((post) => (
          <div className={styles.posts} key={post.id}>
              <img className={styles.imagen} src={post.imagen} alt={`${post.NombreAutor}'s avatar`} />
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

export default Inicio;
