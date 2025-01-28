import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import styles from "./Postear.module.css";
import { db } from "../../Firebase/config";
import Boton from "../Boton";
import { addDoc, collection, Timestamp } from "firebase/firestore";

interface PostearProps {
    isOpen: boolean;
    onClose: () => void;
}

const Postear: React.FC<PostearProps> = ({ isOpen, onClose }) => {
    const { userData } = useAuth(); // Datos del usuario logueado
    const [mensaje, setMensaje] = useState("");

    const handlePost = async () => {
        if (!userData || mensaje.trim() === "") return;

        try {
            // Guardar el post en la colección "posts" de Firestore
            await addDoc(collection(db, "posts"), {
                NombreAutor: userData.nombre,
                username: userData.username,
                imagen: userData.imagen,
                mensaje,
                timestamp: Timestamp.now(),
            });
            setMensaje(""); // Limpiar el mensaje después de publicarlo
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error("Error al crear el post:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>

            <div className={styles.modalContent}>

                <div className={styles.header}>
                    <img src={userData?.imagen} alt="Avatar" className={styles.avatar} />
                    <button className={styles.x} onClick={onClose}> <h2 className={styles.x}>X</h2> </button>
                </div>

                <div className={styles.form}>
                    <textarea
                        placeholder="¿Qué quieres opinar?"
                        rows={3}
                        className={styles.area}
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        ></textarea>
                    <div className={styles.botones}>
                        <Boton size="lg" onClick={handlePost}>Postear</Boton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Postear;