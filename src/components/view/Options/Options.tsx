import React from 'react';
import { Option } from 'types/types';

type OptionsProps = {
  options: Option[];
  onSelect: (value: Option) => void;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect }) => {
  return (
    <ul>
      {options.map(item => (
        <li key={item}>
          <button onClick={() => onSelect(item)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;