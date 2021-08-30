import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from 'globals.module.scss'

const LibrasToggle: React.FC = () => {
  const { libras, setLibras } = useContext(SettingsContext);

  const toggleLibras = () => {
    setLibras(!libras)
  }

  return (
      <button 
        onClick={toggleLibras}
        data-testid="libras-toggle" 
        className={styles.libras}
      >
        {libras ? 'Texto' : 'Libras' }
      </button>
  );
}

export default LibrasToggle;