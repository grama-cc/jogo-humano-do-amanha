import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './IntroSidebar.module.scss';

type IntroSidebarProps = {
  aboutText?: string;
  text?: string;
  ctaLabel: string;
  ctaAction: () => void;
}

const IntroSidebar: React.FC<IntroSidebarProps> = ({ aboutText, text, ctaLabel, ctaAction }) => {
  const { step, showAboutPopUp, setShowAboutPopUp, transitionStep } = useContext(SettingsContext);

  const aboutPopUp = () => {
    setShowAboutPopUp(!showAboutPopUp);
  };

  return (
    <div className={styles.sidebar}>
    {step === 'home' && (

      <button className={styles.about} onClick={aboutPopUp}>
        <span className={`${transitionStep && styles.transition}`}>{aboutText}</span>
      </button>
    )}
      <p className={styles.text}>
        <span className={`${transitionStep && styles.transition}`}>{text}</span>
      </p>

      <button className={`${styles.cta} ${transitionStep ? styles.transitionButton : ''}`} onClick={ctaAction}>
        <span className={`${transitionStep && styles.transition}`}>{ctaLabel}</span>

      </button>
    </div>
  );
}

export default IntroSidebar;