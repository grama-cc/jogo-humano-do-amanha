import React, { useState,useEffect, useContext, useRef } from 'react';
import { Option } from 'types/types';
import SettingsContext from 'context/settingsContext';

import styles from './Options.module.scss';

const yesAudio = require('assets/audios/sim.mp3');
const maybeAudio = require('assets/audios/talvez.mp3');
const noAudio = require('assets/audios/nao.mp3');

type OptionsProps = {
  options: Option[];
  onSelect: (value: string) => void;
  selected?: string;
}

const Options: React.FC<OptionsProps> = ({ options, onSelect, selected}) => {
  const { step, libras } = useContext(SettingsContext);

  const yesAudioRef = useRef<HTMLAudioElement>(new Audio(yesAudio.default));
  const maybeAudioRef = useRef<HTMLAudioElement>(new Audio(maybeAudio.default));
  const noAudioRef = useRef<HTMLAudioElement>(new Audio(noAudio.default));


  useEffect(() => {
    if(yesAudioRef.current){
      yesAudioRef.current.load();
    }
    if(maybeAudioRef.current){
      maybeAudioRef.current.load();
    }
    if(noAudioRef.current){
      noAudioRef.current.load();
    }
  }, []);

  const [animate, setAnimate] = useState<boolean>(true);
  useEffect(() => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true)
    }, 500);
  }, [libras])

  const selectItem = async (value: string) => {

    if(selected === value || !selected){
      if(value === 'SIM'){
        yesAudioRef.current.currentTime=0.4;
        try{
          await yesAudioRef.current.play();
        }catch(err){
          console.error(err);
        }
      } else if(value === 'TALVEZ'){
        maybeAudioRef.current.currentTime=0.4;
        try{
         await maybeAudioRef.current.play();
        }catch(err){
          console.error(err);
        }
      } else {
        noAudioRef.current.currentTime=0.4;
        try{
          await noAudioRef.current.play();
        }catch(err){
          console.error(err);
        }
      }
    }
    onSelect(value);
  };


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
          <button onClick={() => selectItem(item.value)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Options;