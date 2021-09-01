import React, { useContext, useCallback } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import styles from 'globals.module.scss';

type MenuProps = {
  text: string,
  prevStep: Step,
  prevAction?: () => void
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction }) => {
  const { setStep } = useContext(SettingsContext);

  const goBack = () => {
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };

  return (
    <nav className={styles.menu}>
      <button onClick={goBack}>Voltar</button>
      <p>{text}</p>
    </nav>
  );
}

export default Menu;