import React, { useContext,useState, useEffect, useRef } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './IntroSidebar.module.scss';

const openAboutAudio = require('assets/audios/sobre_abrir.mp3');
const closeAboutAudio = require('assets/audios/sobre_fechar.mp3');

type IntroSidebarProps = {
  aboutText?: string;
  text?: string;
  ctaLabel?: string;
  ctaAction?: () => void;
  endCtaLabelResult?: string;
  endCtaActionResult?: () => void;
  endCtaLabelHome?: string;
  endCtaActionHome?: () => void;
}

const IntroSidebar: React.FC<IntroSidebarProps> = ({ aboutText, text, ctaLabel, ctaAction, endCtaLabelResult, endCtaActionResult, endCtaLabelHome, endCtaActionHome }) => {
  const { step, showAboutPopUp, setShowAboutPopUp, transitionStep } = useContext(SettingsContext);

  const openAboutRef = useRef<HTMLAudioElement>(new Audio(openAboutAudio.default));
  const closeAboutRef = useRef<HTMLAudioElement>(new Audio(closeAboutAudio.default));

  const [openedAbout, setOpenedAbout] = useState<boolean>(false);

  useEffect(() => {
    if(openAboutRef.current){
      openAboutRef.current.setAttribute('preload', 'true');
      openAboutRef.current.load();
    }
    if(closeAboutRef.current){
      closeAboutRef.current.setAttribute('preload', 'true');
      closeAboutRef.current.load();
    }
  }, []);

  const aboutPopUp = () => {
    openAboutRef.current.currentTime = .6;
    try{
      openAboutRef.current.play();
    }catch(err){
      console.error(err);
    }
    setTimeout(() => {
      openAboutRef.current.pause();
      openAboutRef.current.currentTime = .6;
      openAboutRef.current.load();
    }, 1500);
    setOpenedAbout(true);
    setShowAboutPopUp(!showAboutPopUp);
  };

  useEffect(() => {
    if(openedAbout && !showAboutPopUp){
      setOpenedAbout(false);
      closeAboutRef.current.currentTime = .6;
      try{
        closeAboutRef.current.play();
      }catch(err){
        console.error(err);
      }
      setTimeout(() => {
        closeAboutRef.current.pause();
        closeAboutRef.current.currentTime = .6;
        closeAboutRef.current.load();
      }, 1500);
    }
  }, [openedAbout, showAboutPopUp])

  return (
    <div className={styles.sidebar}>
      {step === 'home' && (
        <button className={styles.about} onClick={aboutPopUp}>
          <span className={`${transitionStep && styles.transition}`}>{aboutText}</span>
        </button>
      )}

      <p className={styles.text}>
        <span className={`${transitionStep && styles.transition}`}>{text}</span>
        <span className={`${transitionStep && styles.transition} ${styles.smalltext}`}>A versão online do jogo “Humano do amanhã” é uma realização do Museu do Amanhã com patrocínio da EY.</span>
      </p>

      {(ctaLabel && ctaAction) && (
        <button className={`${styles.cta} ${transitionStep ? styles.transitionButton : ''}`} onClick={ctaAction}>
          <span className={`${transitionStep && styles.transition}`}>{ctaLabel}</span>
        </button>
      )}

      {step === 'end' && (
        <>
          <button className={styles.endCta} onClick={endCtaActionResult}>
            <span>{endCtaLabelResult}</span>
          </button>

          <button className={styles.endCta} onClick={endCtaActionHome}>
            <span className={styles.smalltext}>{endCtaLabelHome}</span>
          </button>
        </>
      )}

    </div>
  );
}

export default IntroSidebar;