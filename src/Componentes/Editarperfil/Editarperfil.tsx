import { useState } from "react";
import Boton from "../Boton";
import { useAuth } from "../Context/AuthContext";
import styles from "./Editarperfil.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";

interface EditarPerfilProps {
    isOpen: boolean;
    onClose: () => void;
  }

const Editarperfil: React.FC<EditarPerfilProps> = ({ isOpen, onClose }) => {

    const { user, userData } = useAuth();
    const [formData, setFormData] = useState({
      nombre: userData?.nombre || "",
      apellido: userData?.apellido || "",
      telefono: userData?.telefono || "",
      imagen: userData?.imagen || "",
      descripcion: userData?.descripcion || "",
      ubicacion: userData?.ubicacion || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleGuardar = async () => {
        if (!user) return;
    
        try {
          const userRef = doc(db, "usuarios", user.uid);
          await updateDoc(userRef, formData);
          alert("Perfil actualizado con éxito");
          onClose(); // Cierra el modal
        } catch (error) {
          console.error("Error al actualizar perfil:", error);
          alert("Hubo un error al guardar los cambios.");
        }
      };
    
      if (!isOpen) return null;

  return (
    <div className={styles.modal}>

        <div className={styles.modalContent}>

            <div className={styles.encabezado}>
                <h1>Editar Perfil</h1>
                <Boton size="lg" onClick={handleGuardar}>Guardar</Boton>
            </div>

            <input 
                type="text"
                placeholder="Link de la imagen"
                className={styles.input} 
                name="imagen"
                value={formData.imagen}
                onChange={handleInputChange}
            />

            <input 
                type="text"
                placeholder="Nombre"
                className={styles.input} 
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
            />

            <input 
                type="text"
                placeholder="Apellido"
                className={styles.input}
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange} 
            />

            <input 
                type="text"
                placeholder="telefono"
                className={styles.input}
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange} 
            />

            <textarea
                placeholder="Descripción"
                className={styles.textarea}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
            >
            </textarea>

            <input 
                type="text" 
                placeholder="Ubicación"
                className={styles.input}
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
            />

            <Boton size="lg" variant="outline" onClick={onClose}>Cancelar</Boton>
        
        </div>

    </div>
  )
}

export default Editarperfil