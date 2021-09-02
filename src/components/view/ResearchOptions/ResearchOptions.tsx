import React from 'react';
import { ProfileOption } from 'types/types';

type ResearchOptionsProps = {
  options: ProfileOption[];
  onSelect: (value: string) => void;
}

const ResearchOptions: React.FC<ResearchOptionsProps> = ({ options, onSelect }) => {
  return (
    <ul>
      {options.map(item => (
        <li key={item.id}>
          <button onClick={() => onSelect(item.value)}>
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ResearchOptions;