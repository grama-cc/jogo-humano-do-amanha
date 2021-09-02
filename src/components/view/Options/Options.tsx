import React, { useContext } from 'react';
import { Option } from 'types/types';
import SettingsContext from 'context/settingsContext';

import globalStyles from 'globals.module.scss';
import styles from './Options.module.scss';

type OptionsProps = {
  options: Option[];
  onSelect: (value: Option) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect }) => {
  const { step } = useContext(SettingsContext);

  return (
    <ul>
      {options.map(item => (
        <li
          key={item} 
          className={step === 'countdown' ? `${styles.optionCountdown}` : `${styles.quizOption}` }
        >
          <button onClick={() => onSelect(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;