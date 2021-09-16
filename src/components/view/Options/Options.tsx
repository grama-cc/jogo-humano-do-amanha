import React, { useState,useEffect, useContext } from 'react';
import { Option } from 'types/types';
import SettingsContext from 'context/settingsContext';

import styles from './Options.module.scss';

type OptionsProps = {
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect, selected}) => {
  const { step, libras } = useContext(SettingsContext);

  const [animate, setAnimate] = useState<boolean>(true);
  useEffect(() => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true)
    }, 500);
  }, [libras])

  const [restart, setRestart] = useState<boolean>()

  return (
    <ul className={step === 'countdown' ? `${styles.optionsCountdown}` : `${styles.quizOptions}`}>
      {options.map(item => (
        <li
          key={item.value} 
          className={`${step === 'countdown' ? styles.optionCountdown : styles.quizOption}
          ${selected && selected !== item.value ? styles.disabled: ''}
          ${selected && selected === item.value ? styles.selected: ''}
          ${animate ? styles.animate: ''}
        `}
        >
          <button onClick={() => onSelect(item.value)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;