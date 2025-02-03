import { useForm, SubmitHandler } from "react-hook-form";
import Boton from "../Boton";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app, { db } from "../../Firebase/config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const auth = getAuth(app)

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {

  const { register, handleSubmit, reset } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "imagenes"));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.logo) {
            setLogoUrl(data.logo); // Suponiendo que "logo" es la URL de la imagen
          }
        });
      } catch (error) {
        console.error("Error obteniendo la imagen:", error);
      }
    };
  
    fetchLogo();
  }, []);

  const enviar: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log("Usuario logueado: ", userCredential.user);
      reset();
      navigate("/"); // Redirige al inicio
    } catch (error) {
        console.error("Error al cargar producto: ", error);
        setErrorMessage("Credenciales Incorrectas");
    }
    
  }

  const crearUsuario = () => {
    navigate('/crearcuenta');
};

  return (
    <div className={styles.container}>

          {logoUrl ? (
            <img className={styles.logo} src={logoUrl} alt="logo" />
          ) : (
            <p>Cargando logo...</p> // Mensaje mientras carga la imagen
          )}


        <form className={styles.contenedor} onSubmit={handleSubmit(enviar)}>

            <h1 className={styles.titulo}>Enterate de lo que esta pasando</h1>

            <button className={styles.botonGoogle}>Inicia sesion con Google
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" 
                  width="32px"
                  height="32px"
            >
                  <path fill="#74C0FC" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
            </button>

            <input 
                type="email" 
                placeholder="email"
                className={styles.input}
                {...register("email", { required: "El email es obligatorio" })}
            /> 

            <input 
                type="password" 
                placeholder="password"
                className={styles.input}
                {...register("password", { required: "El password es obligatorio" })}
            />

            { errorMessage && <p className={styles.error}>{errorMessage}</p> }

            <Boton type="submit">Ingresar</Boton>

            <p className={styles.parrafo}>Crea una cuenta y conectate</p>

            <Boton type="button" onClick={crearUsuario}>Crear Cuenta</Boton>

        </form>

    </div>
  )
}

export default Login