import styles from "./Perfil.module.css";

const Perfil = () => {
  return (
    <div className={styles.perfil}>
        <p>imagen de perfil</p>
        <p>Bienvenido usuario</p>
        <p>username</p>
        <p>descripcion</p>
        <p>ubicacion</p>
        <br />
        <p>publicaciones</p>
    </div>
  )
}

export default Perfil