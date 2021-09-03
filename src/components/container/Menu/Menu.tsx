import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import GoBackWhite from 'assets/icons/arrow-white.svg';
//import GoBackBlack from 'assets/icons/arrow-black.svg';

import globalStyles from 'globals.module.scss';

type MenuProps = {
  text: string,
  prevStep: Step,
  prevAction?: (() => void) | null
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction = null }) => {
  const { setStep, setLoading } = useContext(SettingsContext);

  const goBack = () => {
    setLoading(false);
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };

  return (
    <nav className={globalStyles.menu}>
      <button onClick={goBack}>
        <img src={GoBackWhite} alt="Voltar" />
      </button>
      <p>{text}</p>
    </nav>
  );
}

export default Menu;