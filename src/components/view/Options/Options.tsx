import React, { useContext } from 'react';
import { Option } from 'types/types';
import SettingsContext from 'context/settingsContext';

import styles from './Options.module.scss';

type OptionsProps = {
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect, selected }) => {
  const { step } = useContext(SettingsContext);

  return (
    <ul className={step === 'countdown' ? `${styles.optionsCountdown}` : `${styles.quizOptions}`}>
      {options.map(item => (
        <li
          key={item.value} 
          className={`${step === 'countdown' ? `${styles.optionCountdown}` : `${styles.quizOption}`}
          ${selected && selected !== item.value ? styles.disabled: ''}`}
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