import { Search } from "lucide-react";
import styles from "./Sidebar.module.css";
import Boton from "../Boton";

const Sidebar = () => {
  return (
    <div className={styles.container}>

        <h4 className={styles.search}>
        <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input 
            type="text" 
            placeholder="Buscar" 
            className={styles.searchInput} 
            />
        </div>
        </h4>


        <section className={styles.section}>
            <h2>Suscribete a Premium</h2>
            <p className={styles.parrafo}>Suscríbete para desbloquear nuevas funciones y, si eres elegible, recibir un pago de cuota de ingresos.</p>
            <Boton size="lg">Suscribete</Boton>
        </section>

        <section className={styles.section}>
            <h1>En directo Twitter</h1>
            <p>Recomendado en video ahora</p>
        </section>

        <section className={styles.section}>
            <h2>Que esta pasando</h2>

            <h3>Presidente de la república</h3>
            <p>politica</p>
            <br />

            <h3>Fútbol Colombiano</h3>
            <p>deportes</p>
            <br />

            <h3>Visa para viajes</h3>
            <p>pais</p>
            <br />

            <h3>Libros en tendencia</h3>
            <p>cultura</p>
            <br />
        </section>

        <section className={styles.section}>
            <h2>A quién seguir</h2>

            <h3>BBC News</h3>

            <h3>Canal Institucional</h3>

            <h3>Desarrollo Web</h3>
        </section>
    </div>
  )
}

export default Sidebar