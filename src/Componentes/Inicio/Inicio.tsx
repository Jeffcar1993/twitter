import styles from "./Inicio.module.css";
import { Link } from "react-router-dom"
import Boton from "../Boton/Boton"


const Inicio = () => {
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
        >
        </textarea> 
        
        <div className={styles.boton}>
          <Boton size="lg">Postear</Boton>
        </div>
      </div>

      <div>
        <p>Todas las publicaciones</p>
      </div>

    </div>
  )
}

export default Inicio