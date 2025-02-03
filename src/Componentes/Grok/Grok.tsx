import { Search } from 'lucide-react';
import styles from './Grok.module.css';

const Grok = () => {
  return (
    <div className={styles.grok}>

        <h1 className={styles.title}>Grok</h1>

        <h4 className={styles.search}>
        <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input 
            type="text" 
            placeholder="Obten ayuda de la inteligencia artificial" 
            className={styles.searchInput} 
            />
        </div>
        </h4>

    </div>
  )
}

export default Grok