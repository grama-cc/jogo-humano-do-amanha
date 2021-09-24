import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import {ReactComponent as WhiteLibras} from 'assets/icons/libras-white.svg';

import globalStyles from 'globals.module.scss';
import styles from './LibrasToggle.module.scss';

type LibrasToggleProps = {
  blackIcon?: boolean;
}

const LibrasToggle: React.FC<LibrasToggleProps> = ({ blackIcon }) => {
  const { step, libras, setLibras } = useContext(SettingsContext);

  const toggleLibras = () => {
    setLibras(!libras)
  }

  return (
      <button 
        onClick={toggleLibras}
        data-testid="libras-toggle" 
        className={`${globalStyles.librasWhite} ${blackIcon ? globalStyles.librasBlack : ''} ${step === 'allhumans' && globalStyles.allhumansLibras}`}
      >
        <WhiteLibras
          title="Mostrar vídeo em Libras"
          className={`${styles.librasIcon} ${blackIcon ? styles.black : ''}`}
        />
      </button>
  );
}

export default LibrasToggle;