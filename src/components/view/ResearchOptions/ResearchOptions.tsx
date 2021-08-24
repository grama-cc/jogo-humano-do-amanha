import React from 'react';

type ResearchOptionsProps = {
  options: string[];
  onSelect: (value: string) => void;
}

const ResearchOptions: React.FC<ResearchOptionsProps> = ({ options, onSelect }) => {
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

export default ResearchOptions;