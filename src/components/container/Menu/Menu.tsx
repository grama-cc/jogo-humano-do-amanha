import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import GoBackWhite from 'assets/icons/arrow-white.svg';
import GoBackBlack from 'assets/icons/arrow-black.svg';

import globalStyles from 'globals.module.scss';

type MenuProps = {
  text?: string,
  prevStep: Step,
  prevAction?: (() => void) | null
  blackIcon?: boolean,
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction = null, blackIcon }) => {
  const { step, setStep, setLoading } = useContext(SettingsContext);

  const goBack = () => {
    setLoading(false);
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };

  return (
    <nav className={`${step === 'result' ? globalStyles.menuResult : globalStyles.menu}`}>
      <button onClick={goBack}>
        <img src={blackIcon ? GoBackBlack : GoBackWhite} alt="Voltar" />
      </button>
      {text && <p style={{ color: `${blackIcon ? '#0d0d0d' : '#E9E9E9'}` }}>{text}</p>}
    </nav>
  );
}

export default Menu;