import React, { useState, useEffect, useCallback } from 'react';
import { ProfileOption } from 'types/types';

type ResearchOptionsProps = {
  options: ProfileOption[];
  onSelect: (value: string, textValue?: string) => void;
}

const ResearchOptions: React.FC<ResearchOptionsProps> = ({ options, onSelect }) => {
  const [textValue, setTextValue] = useState<string>('');

  useEffect(() => {
    setTextValue('');
  }, [options]);

  const renderOption = useCallback((option) => {
    if(option.optionType === 'input'){
      return (
        <div>
          <input placeholder={option.text}
            value={textValue}
            onChange={(e) => setTextValue(e.currentTarget.value)}
          />
          <button onClick={() => onSelect(option.value, textValue)}>Enviar</button>
        </div>);
    } 
    if(option.stars){
      return (
        <button onClick={() => onSelect(option.value)}>
          {option.text} {'*'.repeat(parseInt(option.value,10))}
        </button>
      );
    } 
    return (
      <button onClick={() => onSelect(option.value)}>
        {option.text}
      </button>
    );
  }, [options, textValue, setTextValue]);

  return (
    <ul>
      {options.map(item => (
        <li key={item.id}>
          {renderOption(item)}
        </li>
      ))}
    </ul>
  );
}

export default ResearchOptions;