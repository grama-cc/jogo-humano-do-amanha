import React, { useState, useEffect, useCallback } from 'react';
import { ProfileOption } from 'types/types';

import {ReactComponent as Star} from 'assets/shapes/Star.svg';
import {ReactComponent as Send} from 'assets/icons/Send.svg';


import styles from './ResearchOptions.module.scss';

type ResearchOptionsProps = {
  options: ProfileOption[];
  onSelect: (value: string, textValue?: string) => void;
  searchable: boolean;
  selected: string;
}

const ResearchOptions: React.FC<ResearchOptionsProps> = ({ options, onSelect, selected, searchable }) => {
  const [textValue, setTextValue] = useState<string>('');

  useEffect(() => {
    setTextValue('');
  }, [options]);

  const renderOption = useCallback((option, multiple) => {
    if(option.optionType === 'input'){
      if(multiple){
        return (
          <div className={styles.inputContainer}>
            <input placeholder={option.text}
              value={textValue}
              onChange={(e) => setTextValue(e.currentTarget.value)}
            />
            <button 
              disabled={!textValue} 
              className={styles.send} onClick={() => onSelect(option.value, textValue)}><Send/></button>
          </div>
        )
      } return (
        <div className={styles.singleInputContainer}>
          <textarea placeholder={option.text}
            value={textValue}
            onChange={(e) => setTextValue(e.currentTarget.value)}
          />
          <button disabled={!textValue} className={styles.send} onClick={() => onSelect(option.value, textValue)}><Send/></button>
        </div>);
    } 
    if(option.stars){
      return (
        <button className={`${styles.rateButton} ${selected === option.value ? styles.active : ''}`} onClick={() => onSelect(option.value)}>
          {option.text} {Array(parseInt(option.value,10)).fill(<Star/>)}
        </button>
      );
    } 
    return (
      <button
        className={`${selected === option.value ? styles.active : ''}`}
        onClick={() => onSelect(option.value)}>
        {option.text}
      </button>
    );
  }, [textValue, setTextValue, selected, onSelect]);

  return (
    <ul className={`${styles.container} ${searchable ? styles.longList : ''}`}>
      {options.map(item => (
        <li key={item.id} className={styles.optionContainer}>
          {renderOption(item, options.length > 1)}
        </li>
      ))}
      {searchable && options.length < 6 && (
        Array(6).fill(
          <li className={styles.optionContainer}/>
        )
      )}
      
    </ul>
  );
}

export default ResearchOptions;