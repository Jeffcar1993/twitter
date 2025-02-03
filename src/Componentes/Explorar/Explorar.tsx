
import { Search } from "lucide-react";
import styles from "./Explorar.module.css";

const Explorar = () => {
  return (
    <div className={styles.explorar}>

        <h1 className={styles.title}>Explorar</h1>

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

        <section className={styles.recomendados}>
            <h2>Recomendado para ti</h2>

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

    </div>
  )
}

export default Explorar