import React, { useContext} from 'react';
import SettingsContext from 'context/settingsContext';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import styles from 'globals.module.scss'

type MenuProps = {
  text: string,
}

const Menu: React.FC<MenuProps> = ({ text }) => {
  const { step, setStep } = useContext(SettingsContext);

  const goBack = () => {
    setStep(step - 1)
  };

  return (
    <nav className={styles.menu}>
      <button onClick={goBack}>Voltar</button>
      <p>{text}</p>
    </nav>
  );
}

export default Menu;