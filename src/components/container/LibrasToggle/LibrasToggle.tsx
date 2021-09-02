import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import BlackLibras from 'assets/icons/libras-black.svg';
import WhiteLibras from 'assets/icons/libras-white.svg';

import styles from 'globals.module.scss';

type LibrasToggleProps = {
  blackIcon?: boolean;
}

const LibrasToggle: React.FC<LibrasToggleProps> = ({ blackIcon }) => {
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
        <img src={blackIcon ? BlackLibras : WhiteLibras} alt="Mostrar vídeo em Libras" width={30} height={30} />
      </button>
  );
}

export default LibrasToggle;