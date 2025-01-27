import styles from "./Crearcuenta.module.css";
import Boton from "../Boton";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import app, { db } from "../../Firebase/config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app)

interface LoginFormInputs {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    username: string;
    password: string;
  }

const Crearcuenta = () => {

    const { register, handleSubmit, reset } = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")

    const crearUsuario : SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const { email, password, nombre, apellido, telefono, username } = data;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                nombre,
                apellido,
                email,
                telefono,
                username,
            })

             console.log("Usuario creado: ", userCredential.user);
                reset(); // Limpia el formulario
                alert("Cuenta creada con éxito.");
        } catch (error) {
            console.error("Error al crear usuario", error);
            setErrorMessage("Ocurrió un error. Debes llenar todos los campos.");
        }
      }

    const ingresar = () => {
        navigate('/login');
    }

  return (
    <div className={styles.container}>

        <img className={styles.logo} src="../src/assets/logo.png" alt="logo" />

        <form className={styles.contenedor} onSubmit={handleSubmit(crearUsuario)}>

            <h1 className={styles.titulo}>Crear una cuenta</h1>

            <input type="text"
                className={styles.input}
                placeholder="Digite su nombre" 
                {...register("nombre", { required: "El nombre es obligatorio" })}
            />

            <input type="text" 
                className={styles.input}
                placeholder="Digite su apellido"
                {...register("apellido", { required: "El apellido es obligatorio" })}
            />

            <input type="email"
                className={styles.input}
                placeholder="Digite su email" 
                {...register("email", { required: "El email es obligatorio" })}
            />

            <input type="telefono"
                className={styles.input}
                placeholder="Digite su telefono" 
                {...register("telefono", { required: "El telefono es obligatorio" })}
            />

            <input type="text"
                className={styles.input}
                placeholder="Digite su username" 
                {...register("username", { required: "El username es obligatorio" })}
            />

            <input 
                type="password" 
                placeholder="password"
                className={styles.input}
                {...register("password", { required: "El password es obligatorio" })}
            />

            { errorMessage && <p className="error">{errorMessage}</p> }

            <Boton type="submit">Crear Cuenta</Boton>

            <p className={styles.parrafo}>¿Ya tienes una cuenta? </p>
            <Boton type="button" onClick={ingresar}>Ingresar</Boton>

        </form>
    </div>
  )
}

export default Crearcuenta