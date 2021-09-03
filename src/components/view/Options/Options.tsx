import React, { useContext } from 'react';
import { Option } from 'types/types';
import SettingsContext from 'context/settingsContext';

import globalStyles from 'globals.module.scss';
import styles from './Options.module.scss';

type OptionsProps = {
  options: Option[];
  onSelect: (value: string) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect }) => {
  const { step } = useContext(SettingsContext);

  return (
    <ul>
      {options.map(item => (
        <li
          key={item.value} 
          className={step === 'countdown' ? `${styles.optionCountdown}` : `${styles.quizOption}` }
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