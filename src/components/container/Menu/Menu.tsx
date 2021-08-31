import React, { useContext} from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import styles from 'globals.module.scss';

type MenuProps = {
  text: string,
  prevStep: Step,
}

const Menu: React.FC<MenuProps> = ({ text, prevStep }) => {
  const { step, setStep } = useContext(SettingsContext);

  const goBack = () => {
    setStep(prevStep);
  };

  return (
    <nav className={styles.menu}>
      <button onClick={goBack}>Voltar</button>
      <p>{text}</p>
    </nav>
  );
}

export default Menu;